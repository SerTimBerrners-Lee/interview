import { cardComponent } from "./components/card.js";
import CarsApi from "./api/cars.js";

let page = 0;
function toPage(type) {
  if (type == "next") {
    page++;
  } else if (type == "prev") {
    page = page <= 0 ? 0 : page - 1;
  }

  CarsApi.getCars(page).then((cars) => {
    const car_item = document.querySelectorAll("#card-main>.col");
    if (car_item.length) {
      car_item.forEach((car) => car.remove());
    }

    for (const car of cars) {
      const div = document.createElement("div");
      div.className = "col";

      div.innerHTML = cardComponent(car.urls.small, car.alt_description);

      document.getElementById("card-main").appendChild(div);
    }
  });
}

toPage("next");

setTimeout(() => {
  document.getElementById("prev").onclick = function () {
    toPage("prev");
  };
  document.getElementById("next").onclick = function () {
    toPage("next");
  };
}, 1000);
