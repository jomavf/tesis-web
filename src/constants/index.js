export const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:9000/api/v1"
    : "https://ires2-tesis-backend.herokuapp.com/api/v1";
