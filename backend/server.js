import express from 'express';
import cors from 'cors';
import { jobs, filters, company, news } from './data.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

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
const OAUTH_PROVIDERS = {
  google: {
    label: 'Google',
    color: '#4285F4',
    profile: { name: 'Jordan Miller', email: 'jordan.miller@gmail.com' },
  },
  linkedin: {
    label: 'LinkedIn',
    color: '#0a94c4',
    profile: { name: 'Jordan Miller', email: 'jordan.miller@linkedin.com' },
  },
  facebook: {
    label: 'Facebook',
    color: '#3b5998',
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
  <div class="brand">${p.label}</div>
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

app.listen(PORT, () => {
  console.log(`Backend API running at http://localhost:${PORT}`);
});
