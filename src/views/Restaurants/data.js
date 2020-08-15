import uuid from "uuid/v1";

export default [
  {
    id: uuid(),
    name: "Ekaterina Tankova",
    description: "Restaurante de comida tailandesa",
    capacity: 99,
    businessHours: "9:00 - 19:00",
  },
  {
    id: uuid(),
    name: "Sal y mar",
    description: "Sabores Peruanos",
    capacity: 79,
    businessHours: "8:00 - 21:00",
  },
  {
    id: uuid(),
    name: "Four seasons",
    description: "Comida Asiatica",
    capacity: 29,
    businessHours: "7:00 - 18:00",
  },
];
