import { BASE_URL } from "../../../constants";
const domain = "spa";
const urlReservation = `${BASE_URL}/reservation-${domain}s`;

export async function requestReservation() {
  const response = await fetch(urlReservation, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });
  return await response.json();
}

export async function requestCreateOrUpdateReservation(data) {
  let response = null;
  response = await fetch(urlReservation, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await response.json();
}

export async function requestReservationDelete(id) {
  let response = null;
  response = await fetch(`${urlReservation}/${id}`, {
    method: "DELETE",
  });
  return await response.json();
}
