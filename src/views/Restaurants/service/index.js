import { BASE_URL } from "../../../constants";

export async function requestRestaurants() {
  const url = `${BASE_URL}/restaurants`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });
  return await response.json();
}

export async function requestCreateOrUpdate(data) {
  const url = `${BASE_URL}/restaurants`;
  let response = null;
  response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await response.json();
}

export async function requestDelete(id) {
  const url = `${BASE_URL}/restaurants/${id}`;
  let response = null;
  response = await fetch(url, {
    method: "DELETE",
  });
  return await response.json();
}
