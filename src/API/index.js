import { BASE_URL } from "../constants";
const guestUrl = `${BASE_URL}/guests`;

export async function requestGuests() {
  const response = await fetch(guestUrl, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });
  return await response.json();
}
