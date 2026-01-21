// const BASE_URL = "http://localhost:3001";

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://api.ic.oops.wtf"
    : "http://localhost:3001";

export function uploadImage(file) {
  const formData = new FormData();
  formData.append("image", file);

  return fetch(`${BASE_URL}/api/uploads/images`, {
    method: "POST",
    body: formData,
  }).then((res) => {
    if (!res.ok) return Promise.reject(res.status);
    return res.json();
  });
}
