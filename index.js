const url = "https://api.unsplash.com/search/photos";
const access_key = "RZEIOVfPhS7vMLkFdd2TSKGFBS4o9_FmcV1Nje3FSjw";

let page = 0;
async function getCars() {
  const getCarsUrl =
    `${url}?` +
    new URLSearchParams({
      page: page,
      query: "car",
      client_id: access_key,
    }).toString();

  const response = await fetch(getCarsUrl, {
    mode: "cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
  const { results } = await response.json();
  return results;
}

function cardComponent(src, description) {
  return `
    <div class="card" style="width: 18rem;">
      <img src="${src}" class="card-img-top" alt="${description}">
      <div class="card-body">
        <p class="card-text">${description}</p>
      </div>
    </div>
  `;
}

function toPage(type) {
  if (type == "next") {
    page++;
  } else if (type == "prev") {
    page = page <= 0 ? 0 : page - 1;
  }

  getCars().then((cars) => {
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
