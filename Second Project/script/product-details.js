// Get the product ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");
console.log(productId);
// Fetch product data again or pass it through local storage if needed
fetch("../data/data.json")
  .then((response) => response.json())
  .then((data) => {
    const product = data.products.find((p) => p.id == productId);
    console.log(product);

    if (product) {
      // Display product details on the page
      document.getElementsByClassName("prod-title")[0].innerHTML = product.name;
      document.getElementsByClassName(
        "prod-price"
      )[0].innerHTML = `$${product.price}`;
      document.getElementsByClassName(
        "prod-details"
      )[0].innerHTML = `<b>Description:</b> ${product.Description}`;
      document.getElementsByClassName(
        "prod-img"
      )[0].style.backgroundImage = `url("/assets/images/${product.id}.png")`;
      document
        .getElementsByClassName("add-to-cart")[0]
        .addEventListener("click", () => {
          window.location.href = `shoping-cart.html`;
        });
    } else {
      console.error("Product not found!");
    }
  });
