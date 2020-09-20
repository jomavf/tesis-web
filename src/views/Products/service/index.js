import { BASE_URL } from "../../../constants";
export * from "./reservation";

const domain = "product";

export async function requestCategories() {
  const url = `${BASE_URL}/product-categories`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });
  return await response.json();
}

export async function requestItems() {
  const url = `${BASE_URL}/${domain}s`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });
  return await response.json();
}

export async function requestCreateOrUpdate(data) {
  data = {
    ...data,
    has_stock: +data.has_stock === 1 ? true : false,
    quantity: +data.quantity,
    price: +data.price,
    product_category_id: +data.product_category_id,
  };
  console.log("sending data", data);
  const url = `${BASE_URL}/${domain}s`;
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
  const url = `${BASE_URL}/${domain}s/${id}`;
  let response = null;
  response = await fetch(url, {
    method: "DELETE",
  });
  return await response.json();
}
