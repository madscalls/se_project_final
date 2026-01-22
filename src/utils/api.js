const BASE_URL =
  import.meta.env.MODE === "production"
    ? "https://ic.oops.wtf"
    : "http://localhost:3001";

export function uploadImage(file) {
  const formData = new FormData();
  formData.append("image", file);

  return fetch(`${BASE_URL}/api/uploads/images`, {
    method: "POST",
    body: formData,
  }).then(async (res) => {
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      return Promise.reject(data.message || `Upload failed (${res.status})`);
    }
    return data;
  });
}
