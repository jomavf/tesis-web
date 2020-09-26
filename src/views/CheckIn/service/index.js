import { BASE_URL } from "../../../constants";
const urlCheckIns = `${BASE_URL}/check-ins`;
const urlRooms = `${BASE_URL}/rooms`;

export async function requestItems() {
  const response = await fetch(urlCheckIns, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });
  return await response.json();
}

export async function requestRooms() {
  const response = await fetch(urlRooms, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });
  return await response.json();
}

export async function requestCreateOrUpdateItem(data) {
  let response = null;

  response = await fetch(urlCheckIns, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      ...data,
      should_show_on_boarding: Boolean(+data.should_show_on_boarding)
        ? true
        : false,
    }),
  });
  return await response.json();
}

export async function requestReservationDelete(id) {
  let response = null;
  response = await fetch(`${urlCheckIns}/${id}`, {
    method: "DELETE",
  });
  return await response.json();
}
