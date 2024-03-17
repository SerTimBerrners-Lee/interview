export function cardComponent(src, description) {
  return `
    <div class="card" style="width: 18rem;">
      <img src="${src}" class="card-img-top" alt="${description}">
      <div class="card-body">
        <p class="card-text">${description}</p>
      </div>
    </div>
  `;
}