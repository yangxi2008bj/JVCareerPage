const BASE = '/api';

export async function getFilters() {
  const res = await fetch(`${BASE}/filters`);
  if (!res.ok) throw new Error('Failed to load filters');
  return res.json();
}

export async function getCompany() {
  const res = await fetch(`${BASE}/company`);
  if (!res.ok) throw new Error('Failed to load company');
  return res.json();
}

export async function getNews() {
  const res = await fetch(`${BASE}/news`);
  if (!res.ok) throw new Error('Failed to load news');
  return res.json();
}

export async function getJobs(params = {}) {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) value.forEach((v) => qs.append(key, v));
    else if (value) qs.append(key, value);
  });
  const res = await fetch(`${BASE}/jobs?${qs.toString()}`);
  if (!res.ok) throw new Error('Failed to load jobs');
  return res.json();
}

export async function getJob(id) {
  const res = await fetch(`${BASE}/jobs/${id}`);
  if (!res.ok) throw new Error('Failed to load job');
  return res.json();
}

export async function login(payload) {
  const res = await fetch(`${BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Login failed');
  return data;
}

export async function getOAuthUrl(provider) {
  const res = await fetch(`${BASE}/auth/oauth/${provider}/authorize`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to start authorization');
  return data.authUrl;
}

export async function verifyOAuth(provider, token) {
  const res = await fetch(`${BASE}/auth/oauth/${provider}/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Authorization verification failed');
  return data;
}
