let listofitems = localStorage.getItem("user-data");
if (listofitems) listofitems = JSON.parse(listofitems);
else listofitems = {};

const sort_data_asc = (data) => {
  const sortedByPrice = data.products
    .sort((a, b) => Number(a.price) - Number(b.price)) // Sort by price (as numbers)
    .map((product) => product.id);

  return sortedByPrice;
};

const sort_data_desc = (data) => {
  const sortedByPrice = data.products
    .sort((a, b) => Number(b.price) - Number(a.price)) // Sort by price (as numbers)
    .map((product) => product.id);

  return sortedByPrice;
};

const load_page = (filtered_data = null) => {
  fetch("../data/data.json") // Assuming the file is in the same directory as the HTML
    .then((response) => response.json())
    .then((data) => {
      const productList = document.getElementsByClassName("grid-container");
      productList[0].innerHTML = "";
      if (filtered_data) {
        Object.values(filtered_data).forEach((id) => {
          const productDiv = document.createElement("div");
          productDiv.classList.add("product");

          const productImage = document.createElement("div");
          productImage.classList.add("prod-img");
          productImage.style.backgroundImage = `url("/assets/images/${id}.png")`;
          productImage.addEventListener("click", () => {
            window.location.href = `product-details.html?id=${id}`;
          });

          const productTitle = document.createElement("span");
          productTitle.classList.add("prod-title");

          productTitle.textContent = data["products"][id - 1]["name"];

          const productPrice = document.createElement("span");
          productPrice.classList.add("prod-pric");
          productPrice.textContent = `$${data["products"][id - 1][
            "price"
          ].toFixed(2)}`;

          const addToCartButton = document.createElement("button");
          addToCartButton.classList.add("add-to-cart");
          addToCartButton.textContent = "Add to Cart";
          addToCartButton.addEventListener("click", () => {
            const val = data["products"][id - 1]["V_or_S"][0];
            if (id in listofitems && val in listofitems[id]) {
              listofitems[id][val] += 1;
            } else if (id in listofitems) {
              listofitems[id][val] = 1;
            } else {
              listofitems[id] = {
                [val]: 1,
              };
            }
            localStorage.setItem("user-data", JSON.stringify(listofitems));
          });

          productDiv.appendChild(productImage);
          productDiv.appendChild(productTitle);
          productDiv.appendChild(productPrice);
          productDiv.appendChild(addToCartButton);

          productList[0].appendChild(productDiv);
        });
      } else
        data.products.forEach((product) => {
          const productDiv = document.createElement("div");
          productDiv.classList.add("product");

          const productImage = document.createElement("div");
          productImage.classList.add("prod-img");
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
            const val = product.V_or_S[0];
            if (product.id in listofitems && val in listofitems[product.id]) {
              listofitems[product.id][val] += 1;
            } else if (product.id in listofitems) {
              listofitems[product.id][val] = 1;
            } else {
              listofitems[product.id] = {
                [val]: 1,
              };
            }
            localStorage.setItem("user-data", JSON.stringify(listofitems));
          });

          productDiv.appendChild(productImage);
          productDiv.appendChild(productTitle);
          productDiv.appendChild(productPrice);
          productDiv.appendChild(addToCartButton);

          productList[0].appendChild(productDiv);
        });
    })
    .catch((error) => console.error("Error fetching product data:", error));
};

load_page();

document.addEventListener("DOMContentLoaded", function () {
  function toggleFilter(select) {
    document.querySelectorAll(".filter-content").forEach((content) => {
      content.style.display = "none";
    });

    if (select.value === "price-range") {
      document.getElementById("price-range-filter").style.display = "block";
      fetch("../data/data.json")
        .then((response) => response.json())
        .then((data) => {
          const min_price = document.getElementById("min-price");
          const max_price = document.getElementById("max-price");
          const filtered_by_price = [];
          data.products.forEach((product) => {
            if (
              product.price <= max_price.value &&
              product.price >= min_price.value
            )
              filtered_by_price.push(product.id);
          });
          load_page(filtered_by_price);

          min_price.addEventListener("input", () => {
            if (min_price.value < 1) min_price.value = 1;
            const filtered_by_price = [];
            data.products.forEach((product) => {
              if (
                product.price <= max_price.value &&
                product.price >= min_price.value
              )
                filtered_by_price.push(product.id);
            });
            load_page(filtered_by_price);
          });
          min_price.addEventListener("focus", () => {
            min_price.select();
          });
          max_price.addEventListener("input", () => {
            if (max_price.value < 1) max_price.value = 1000;
            const filtered_by_price = [];
            data.products.forEach((product) => {
              if (
                product.price <= max_price.value &&
                product.price >= min_price.value
              )
                filtered_by_price.push(product.id);
            });
            load_page(filtered_by_price);
          });
          max_price.addEventListener("focus", () => {
            max_price.select();
          });
        })
        .catch((error) => console.error("Error fetching product data:", error));
    } else if (select.value === "product-type") {
      document.getElementById("product-type-filter").style.display = "block";
      fetch("../data/data.json")
        .then((response) => response.json())
        .then((data) => {
          const type_select = document.getElementById("product-type");
          type_select.addEventListener("change", () => {
            const type_param = type_select.value;
            const filtered_by_type = [];
            if (type_param === "all") {
              load_page();
            } else {
              data.products.forEach((product) => {
                if (type_param === product.category)
                  filtered_by_type.push(product.id);
              });
              load_page(filtered_by_type);
            }
          });
        })
        .catch((error) => console.error("Error fetching product data:", error));
    } else if (select.value === "sort-price") {
      document.getElementById("sort-price-filter").style.display = "block";
      fetch("../data/data.json")
        .then((response) => response.json())
        .then((data) => {
          const sort_select = document.getElementById("sort-price");
          let sort_param = sort_select.value;

          if (sort_param === "ascending") {
            const sortedByPrice = sort_data_asc(data);
            load_page(sortedByPrice);
          } else {
            const sortedByPrice = sort_data_desc(data);
            load_page(sortedByPrice);
          }
          sort_select.addEventListener("change", () => {
            sort_param = sort_select.value;
            if (sort_param === "ascending") {
              const sortedByPrice = sort_data_asc(data);
              load_page(sortedByPrice);
            } else {
              const sortedByPrice = sort_data_desc(data);
              load_page(sortedByPrice);
            }
          });
        })
        .catch((error) => console.error("Error fetching product data:", error));
    } else {
      load_page();
    }
  }
  window.toggleFilter = toggleFilter;
});

const search_bar = document.getElementById("search-bar");
search_bar.addEventListener("input", () => {
  if (search_bar.value) {
    fetch("../data/data.json")
      .then((response) => response.json())
      .then((data) => {
        const filtered_search = [];
        data.products.forEach((product) => {
          if (
            product.name.toLowerCase().includes(search_bar.value.toLowerCase())
          )
            filtered_search.push(product.id);
          load_page(filtered_search);
        });
      })
      .catch((error) => console.error("Error fetching product data:", error));
  } else load_page();
});
