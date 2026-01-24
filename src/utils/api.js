const API_BASE =
  import.meta.env.VITE_API_BASE ||
  (import.meta.env.MODE === "production"
    ? "https://ic.oops.wtf"
    : "http://localhost:3001");

async function handleRes(res) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok)
    throw new Error(data.message || `Request failed (${res.status})`);
  return data;
}

export async function uploadImage(file, token) {
  const formData = new FormData();
  formData.append("image", file);

  const headers = {};
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}/api/uploads/images`, {
    method: "POST",
    headers,
    body: formData,
  });

  return handleRes(res);
}

export async function createPost(payload, token) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}/api/posts`, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });

  return handleRes(res);
}

export async function getPosts(options = {}, token) {
  const headers = {};
  if (token) headers.Authorization = `Bearer ${token}`;

  const qs = options.color ? `?color=${encodeURIComponent(options.color)}` : "";
  const res = await fetch(`${API_BASE}/api/posts${qs}`, { headers });

  return handleRes(res);
}

export function signin({ email, password }) {
  return fetch(`${API_BASE}/api/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then(handleRes);
}

export function signup({ email, password, name, avatarUrl }) {
  return fetch(`${API_BASE}/api/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, name, avatarUrl }),
  }).then(handleRes);
}

export function getMe(token) {
  return fetch(`${API_BASE}/api/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  }).then(handleRes);
}
