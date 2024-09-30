document.getElementsByClassName("banner")[0].addEventListener("click", () => {
  window.location.href = `product-list.html`;
});
// Function to fetch data and render products
fetch("../data/data.json") // Assuming the file is in the same directory as the HTML
  .then((response) => response.json())
  .then((data) => {
    const productList = document.getElementsByClassName("grid-container");
    for (let i = 0; i < data.products.length / 4; i++) {
      const productDiv = document.createElement("div");
      productDiv.classList.add("product");

      const productImage = document.createElement("div");
      productImage.classList.add("prod-img");
      productImage.style.backgroundImage = `url("/assets/images/${data.products[i].id}.png")`;
      productImage.addEventListener("click", () => {
        window.location.href = `product-details.html?id=${data.products[i].id}`;
      });

      const productTitle = document.createElement("span");
      productTitle.classList.add("prod-title");
      productTitle.textContent = data.products[i].name;

      const productPrice = document.createElement("span");
      productPrice.classList.add("prod-pric");
      productPrice.textContent = `$${data.products[i].price.toFixed(2)}`;

      productDiv.appendChild(productImage);
      productDiv.appendChild(productTitle);
      productDiv.appendChild(productPrice);

      productList[0].appendChild(productDiv);
    }
  })
  .catch((error) => console.error("Error fetching product data:", error));
