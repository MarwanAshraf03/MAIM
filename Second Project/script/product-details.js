let listofitems = localStorage.getItem("user-data");
if (listofitems) listofitems = JSON.parse(listofitems);
else listofitems = {};
console.log(listofitems);
// Get the product ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");
// console.log(productId);
// Fetch product data again or pass it through local storage if needed
fetch("../data/data.json")
  .then((response) => response.json())
  .then((data) => {
    const product = data.products.find((p) => p.id == productId);
    // console.log(product);

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
      const select = document.getElementById("variants");
      product.V_or_S.forEach((option) => {
        // console.log(option);
        const appendd = document.createElement("option");
        appendd.value = option;
        appendd.textContent = option;
        select.appendChild(appendd);
      });
      document
        .getElementsByClassName("add-to-cart")[0]
        .addEventListener("click", () => {
          //   console.log(document.getElementById("variants").value);
          //   window.location.href = `shoping-cart.html`;
          const val = document.getElementById("variants").value;
          if (
            productId in listofitems &&
            listofitems[productId]["variants"] == val
          ) {
            console.log(true);
            console.log(listofitems[productId]["q"]);
            listofitems[productId]["q"]++;
            // console.log("it is already here");
          } else {
            // console.log(val);
            // console.log(listofitems[productId]["variants"]);
            console.log("the else");
            listofitems[productId] = {
              q: 1,
              variants: val,
            };
            // console.log(JSON.stringify(listofitems));
          }
          // console.log(listofitems);
          localStorage.setItem("user-data", JSON.stringify(listofitems));
        });
    } else {
      console.error("Product not found!");
    }
  });
// localStorage.clear();
