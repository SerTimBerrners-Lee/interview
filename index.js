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

function toPage(type) {
  if (type == "next") {
    page++;
  } else if (type == "prev") {
    page = page <= 0 ? 0 : page - 1;
  }

  getCars().then((cars) => {
    const car_item = document.querySelectorAll(".car_item");
    if (car_item.length) {
      car_item.forEach((car) => car.remove());
    }

    for (const car of cars) {
      const div = document.createElement("div");
      div.className = "car_item";

      div.innerText = car.alt_description;
      const img = document.createElement("img");
      img.src = car.urls.small;

      const description = document.createElement("paragraf");
      description.innerText = car.alt_description;

      div.appendChild(img);
      div.appendChild(description);

      document.getElementById("app").appendChild(div);
    }
  });
}

toPage("next");

document.getElementById("app").innerHTML += `
<button id="prev" type="button" class="btn btn-secondary btn-lg">Prev</button>
<button id="next" type="button" class="btn btn-primary btn-lg">Next</button>
`;
setTimeout(() => {
  document.getElementById("prev").onclick = function () {
    toPage("prev");
  };
  document.getElementById("next").onclick = function () {
    toPage("next");
  };
}, 1000);
