import { BASE_URL } from "../../../constants";
const urlHsiaSubscription = `${BASE_URL}/hsia-subscriptions`;
const urlRooms = `${BASE_URL}/rooms`;

export async function requestItems() {
  const response = await fetch(urlHsiaSubscription + "?active=true", {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });
  return await response.json();
}

export async function requestInternetSuccessOrDenial(data) {
  const response = await fetch(urlHsiaSubscription, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await response.json();
}
