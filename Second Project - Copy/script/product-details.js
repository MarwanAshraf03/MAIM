let listofitems = localStorage.getItem("user-data");
if (listofitems) listofitems = JSON.parse(listofitems);
else listofitems = {};
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

fetch("../data/data.json")
  .then((response) => response.json())
  .then((data) => {
    const product = data.products.find((p) => p.id == productId);

    if (product) {
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
        const appendd = document.createElement("option");
        appendd.value = option;
        appendd.textContent = option;
        select.appendChild(appendd);
      });
      document
        .getElementsByClassName("add-to-cart")[0]
        .addEventListener("click", () => {
          const val = document.getElementById("variants").value;
          const qq = document.getElementsByClassName("quantity")[0];
          if (productId in listofitems && val in listofitems[productId]) {
            listofitems[productId][val] += Number(qq.value);
          } else if (productId in listofitems) {
            listofitems[productId][val] = Number(qq.value);
          } else {
            listofitems[productId] = {
              // variant: quantity,
              [val]: Number(qq.value),
            };
          }
          console.log(listofitems);
          qq.value = 1;
          localStorage.setItem("user-data", JSON.stringify(listofitems));
        });
    } else {
      console.error("Product not found!");
    }
  });

const min_price = document.getElementsByClassName("quantity")[0];
min_price.addEventListener("input", () => {
  if (min_price.value < 1) {
    min_price.value = 1;
  }
});
min_price.addEventListener("focus", () => {
  min_price.select();
});
