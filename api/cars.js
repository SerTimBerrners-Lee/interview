import axios from "axios";
import { CARS_URL, ACCESS_KEY } from "./config.js";

export async function getCars(page = 1) {
  if (page < 1) return null;

  const params = new URLSearchParams({
    page: page,
    query: "car",
    client_id: ACCESS_KEY,
  }).toString();

  const getCarsUrl = `${CARS_URL}?${params}`;

  try {
    const { data } = await axios.get(getCarsUrl);
    const { results } = data;
    return results;

  } catch (err) {
    console.log(err);
    return null;
  }
}