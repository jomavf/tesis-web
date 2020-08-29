import { BASE_URL } from "./../../../constants";
export async function requestLogin(credentials) {
  const response = await fetch(`${BASE_URL}/administrators`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  return response.json();
}
