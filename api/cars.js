import { CARS_URL, ACCESS_KEY } from "./config.js";

class CarsApi {
  constructor(url, accessKey) {
    this.url = url;
    this.accessKey = accessKey;
  }

  async getCars(page = 1) {
    if (page < 1) return null;

    const params = new URLSearchParams({
      page: page,
      query: "car",
      client_id: this.accessKey,
    }).toString();

    const getCarsUrl = `${this.url}?${params}`;

    try {
      const response = await fetch(getCarsUrl);
      const { results } = await response.json();
      return results;

    } catch (err) {
      console.log(err);
      return null;
    }
  }
}

export default new CarsApi(CARS_URL, ACCESS_KEY);