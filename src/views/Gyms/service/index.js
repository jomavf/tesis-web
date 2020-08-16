import { BASE_URL } from "../../../constants";

export async function requestGyms() {
  const url = `${BASE_URL}/gyms`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });
  return await response.json();
}

export async function requestCreateOrUpdate(data) {
  const url = `${BASE_URL}/gyms`;
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
  const url = `${BASE_URL}/gyms/${id}`;
  let response = null;
  response = await fetch(url, {
    method: "DELETE",
  });
  return await response.json();
}
