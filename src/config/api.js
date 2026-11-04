const API_URL = (
  import.meta.env.VITE_API_URL ||
  (import.meta.env.PROD
    ? "https://abrars-automobile-server-new.vercel.app"
    : "http://localhost:5001")
).replace(/\/+$/, "");

export default API_URL;
