// Function to fetch data and render products
fetch("../data/data.json") // Assuming the file is in the same directory as the HTML
  .then((response) => response.json())
  .then((data) => {
    const productList = document.getElementsByClassName("grid-container");

    // Iterate over the products and create HTML elements for each product
    data.products.forEach((product) => {
      const productDiv = document.createElement("div");
      productDiv.classList.add("product");

      const productImage = document.createElement("div");
      productImage.classList.add("prod-img");
      // You can dynamically set background images here if you have them
      productImage.style.backgroundImage = `url("/assets/images/${product.id}.png")`;
      productImage.addEventListener("click", () => {
        window.location.href = `product-details.html?id=${product.id}`;
      });

      const productTitle = document.createElement("span");
      productTitle.classList.add("prod-title");
      productTitle.textContent = product.name;

      const productPrice = document.createElement("span");
      productPrice.classList.add("prod-pric");
      productPrice.textContent = `$${product.price.toFixed(2)}`;

      const addToCartButton = document.createElement("button");
      addToCartButton.classList.add("add-to-cart");
      addToCartButton.textContent = "Add to Cart";
      addToCartButton.addEventListener("click", () => {
        window.location.href = `shoping-cart.html`;
      });

      // Append elements to the product div
      productDiv.appendChild(productImage);
      productDiv.appendChild(productTitle);
      productDiv.appendChild(productPrice);
      productDiv.appendChild(addToCartButton);

      // Append product div to the grid container
      productList[0].appendChild(productDiv);
    });
  })
  .catch((error) => console.error("Error fetching product data:", error));
