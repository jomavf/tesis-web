import { BASE_URL } from "../../../constants";
const urlRestaurantReservation = `${BASE_URL}/reservation-restaurants`;

export async function requestReservation() {
  const response = await fetch(urlRestaurantReservation, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });
  return await response.json();
}

export async function requestCreateOrUpdateReservation(data) {
  let response = null;
  response = await fetch(urlRestaurantReservation, {
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
  response = await fetch(`${urlRestaurantReservation}/${id}`, {
    method: "DELETE",
  });
  return await response.json();
}
