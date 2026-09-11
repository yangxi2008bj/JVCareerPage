import express from 'express';
import cors from 'cors';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { jobs, filters, company, news } from './data.js';

const app = express();
const PORT = process.env.PORT || 4000;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// React build output (frontend/dist). backend/ and frontend/ are siblings.
const staticDir = path.resolve(__dirname, '../frontend/dist');

app.use(cors());
app.use(express.json());

// Serve the compiled React app (static assets like JS/CSS/images).
app.use(express.static(staticDir));

// Return available filter options
app.get('/api/filters', (req, res) => {
  res.json(filters);
});

// Company page content
app.get('/api/company', (req, res) => {
  res.json(company);
});

// Newsroom articles
app.get('/api/news', (req, res) => {
  res.json({ total: news.length, news });
});

// List jobs with optional filters + search
app.get('/api/jobs', (req, res) => {
  const { search, jobType, program, category, location } = req.query;

  const toArray = (v) => (v ? (Array.isArray(v) ? v : [v]) : []);
  const jobTypes = toArray(jobType);
  const programs = toArray(program);
  const categories = toArray(category);
  const locations = toArray(location);

  let result = jobs.slice();

  if (search) {
    const q = String(search).toLowerCase();
    result = result.filter(
      (j) =>
        j.title.toLowerCase().includes(q) ||
        j.description.toLowerCase().includes(q) ||
        j.id.toLowerCase().includes(q) ||
        j.location.toLowerCase().includes(q)
    );
  }
  if (jobTypes.length) result = result.filter((j) => jobTypes.includes(j.jobType));
  if (programs.length) result = result.filter((j) => j.program && programs.includes(j.program));
  if (categories.length) result = result.filter((j) => categories.includes(j.category));
  if (locations.length) result = result.filter((j) => locations.includes(j.location));

  const hasFilters =
    !!search ||
    jobTypes.length ||
    programs.length ||
    categories.length ||
    locations.length;

  // The public site shows a large headline count (356). When no filter is
  // applied we mimic that; otherwise show the real filtered count.
  const displayTotal = hasFilters ? result.length : 356;

  res.json({ total: result.length, displayTotal, jobs: result });
});

// Single job detail
app.get('/api/jobs/:id', (req, res) => {
  const job = jobs.find((j) => j.id === req.params.id);
  if (!job) return res.status(404).json({ error: 'Job not found' });
  res.json(job);
});

// Mock sign-in endpoint (email or mobile)
app.post('/api/auth/login', (req, res) => {
  const { method, email, mobile, agreed } = req.body || {};
  if (!agreed) {
    return res.status(400).json({ error: 'You must agree to the User Agreement and Privacy Policy.' });
  }
  if (method === 'email' && email) {
    return res.json({ ok: true, token: 'mock-token-' + Date.now(), user: { email } });
  }
  if (method === 'mobile' && mobile) {
    return res.json({ ok: true, token: 'mock-token-' + Date.now(), user: { mobile } });
  }
  return res.status(400).json({ error: 'Please provide a valid email or mobile number.' });
});

// ---------------------------------------------------------------------------
// Third-party OAuth (Google / LinkedIn / Facebook) — mock but standard-shaped
// Flow: authorize -> provider consent screen -> callback (code) -> exchange
//       code for an access token -> fetch the verified user profile.
// ---------------------------------------------------------------------------
// Consent screens share a red theme; each provider keeps its real brand logo.
const BRAND_RED = '#d93025';
const LOGOS = {
  google: `<svg width="46" height="46" viewBox="0 0 48 48" aria-label="Google"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>`,
  linkedin: `<svg width="44" height="44" viewBox="0 0 24 24" aria-label="LinkedIn"><rect width="24" height="24" rx="3" fill="#0A66C2"/><path fill="#fff" d="M6.94 8.5H4.4V17h2.54V8.5zM5.67 7.4a1.47 1.47 0 100-2.94 1.47 1.47 0 000 2.94zM19.6 17v-4.66c0-2.5-1.34-3.66-3.12-3.66-1.44 0-2.08.79-2.44 1.35V8.5h-2.54V17h2.54v-4.5c0-1.2.86-1.53 1.44-1.53s1.3.44 1.3 1.55V17h2.82z"/></svg>`,
  facebook: `<svg width="44" height="44" viewBox="0 0 24 24" aria-label="Facebook"><path fill="#1877F2" d="M24 12a12 12 0 10-13.88 11.85v-8.38H7.08V12h3.04V9.36c0-3 1.79-4.67 4.53-4.67 1.31 0 2.68.24 2.68.24v2.95h-1.51c-1.49 0-1.95.92-1.95 1.87V12h3.32l-.53 3.47h-2.79v8.38A12 12 0 0024 12z"/></svg>`,
};
const OAUTH_PROVIDERS = {
  google: {
    label: 'Google',
    color: BRAND_RED,
    logo: LOGOS.google,
    profile: { name: 'Jordan Miller', email: 'jordan.miller@gmail.com' },
  },
  linkedin: {
    label: 'LinkedIn',
    color: BRAND_RED,
    logo: LOGOS.linkedin,
    profile: { name: 'Jordan Miller', email: 'jordan.miller@linkedin.com' },
  },
  facebook: {
    label: 'Facebook',
    color: BRAND_RED,
    logo: LOGOS.facebook,
    profile: { name: 'Jordan Miller', email: 'jordan.miller@facebook.com' },
  },
};

// code -> { provider, token, expires }
const authCodes = new Map();
// token -> { provider }
const accessTokens = new Map();
const rand = () => Math.random().toString(36).slice(2) + Date.now().toString(36);

// Step 1: frontend asks for the provider authorize URL
app.get('/api/auth/oauth/:provider/authorize', (req, res) => {
  const p = OAUTH_PROVIDERS[req.params.provider];
  if (!p) return res.status(404).json({ error: 'Unknown provider' });
  res.json({ authUrl: `/api/auth/oauth/${req.params.provider}/consent` });
});

// Step 2: provider consent screen (opened in a popup)
app.get('/api/auth/oauth/:provider/consent', (req, res) => {
  const key = req.params.provider;
  const p = OAUTH_PROVIDERS[key];
  if (!p) return res.status(404).send('Unknown provider');
  const code = rand();
  authCodes.set(code, { provider: key, expires: Date.now() + 5 * 60 * 1000 });
  const callback = `/api/auth/oauth/${key}/callback?code=${code}`;
  res.set('Content-Type', 'text/html').send(`<!doctype html>
<html><head><meta charset="utf-8"><title>Sign in with ${p.label}</title>
<style>
  body{font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;background:#f5f5f5;margin:0;
    display:flex;align-items:center;justify-content:center;min-height:100vh}
  .box{background:#fff;width:340px;padding:32px 28px;border-radius:12px;box-shadow:0 6px 24px rgba(0,0,0,.12);text-align:center}
  .logo{margin-bottom:10px;line-height:0}
  .logo svg{display:inline-block}
  .brand{font-size:20px;font-weight:700;color:${p.color};margin-bottom:6px}
  h1{font-size:16px;margin:14px 0 4px;color:#222}
  p{font-size:13px;color:#666;line-height:1.5}
  .u{background:#fafafa;border:1px solid #eee;border-radius:8px;padding:10px 12px;margin:16px 0;text-align:left}
  .u b{display:block;font-size:14px;color:#222}
  .u span{font-size:12px;color:#888}
  button{width:100%;padding:11px;border:none;border-radius:8px;font-size:14px;font-weight:600;cursor:pointer;margin-top:8px}
  .ok{background:${p.color};color:#fff}
  .cancel{background:#fff;border:1px solid #ddd;color:#555}
  .scope{font-size:12px;color:#999;margin-top:14px}
</style></head>
<body><div class="box">
  <div class="logo">${p.logo}</div>
  <h1>Sign in to continue to TikTok USDS</h1>
  <p>TikTok USDS Careers wants to access your ${p.label} account.</p>
  <div class="u"><b>${p.profile.name}</b><span>${p.profile.email}</span></div>
  <p class="scope">This will allow TikTok USDS Careers to view your name and email address.</p>
  <button class="ok" onclick="location.href='${callback}'">Authorize</button>
  <button class="cancel" onclick="window.close()">Cancel</button>
</div></body></html>`);
});

// Step 3: provider redirects back with an authorization code
app.get('/api/auth/oauth/:provider/callback', (req, res) => {
  const key = req.params.provider;
  const { code } = req.query;
  const record = code && authCodes.get(code);
  if (!record || record.provider !== key || record.expires < Date.now()) {
    return res.status(400).send('Invalid or expired authorization code');
  }
  authCodes.delete(code);
  const token = rand();
  accessTokens.set(token, { provider: key });
  // Notify the opener with the issued token, then close the popup.
  res.set('Content-Type', 'text/html').send(`<!doctype html>
<html><head><meta charset="utf-8"></head><body>
<script>
  (function(){
    var payload={type:'oauth-token',provider:${JSON.stringify(key)},token:${JSON.stringify(token)}};
    if(window.opener){window.opener.postMessage(payload,'*');}
    document.body.innerHTML='<p style="font-family:sans-serif;text-align:center;margin-top:40px">Authorized. You can close this window.</p>';
    setTimeout(function(){window.close();},400);
  })();
</script></body></html>`);
});

// Step 4: frontend exchanges the token for the verified user profile
app.post('/api/auth/oauth/:provider/verify', (req, res) => {
  const key = req.params.provider;
  const p = OAUTH_PROVIDERS[key];
  const { token } = req.body || {};
  const record = token && accessTokens.get(token);
  if (!p || !record || record.provider !== key) {
    return res.status(401).json({ error: 'Invalid access token' });
  }
  accessTokens.delete(token);
  res.json({
    ok: true,
    provider: key,
    token: 'mock-session-' + Date.now(),
    user: { name: p.profile.name, email: p.profile.email, provider: key },
  });
});

// SPA fallback: any non-API GET request returns index.html so that
// client-side (React Router) routes work on direct load / refresh.
app.use((req, res, next) => {
  if (req.method !== 'GET' || req.path.startsWith('/api/')) return next();
  res.sendFile(path.join(staticDir, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Backend API running at http://localhost:${PORT}`);
});
