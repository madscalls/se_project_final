const API_BASE =
  import.meta.env.MODE === "production"
    ? "https://ic.oops.wtf"
    : "http://localhost:3001";

export function uploadImage(file, token) {
  const formData = new FormData();
  formData.append("image", file);

  return fetch(`${API_BASE}/api/uploads/images`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  }).then(async (res) => {
    const data = await res.json().catch(() => ({}));
    if (!res.ok)
      throw new Error(data.message || `Upload failed (${res.status})`);
    return data;
  });
}
