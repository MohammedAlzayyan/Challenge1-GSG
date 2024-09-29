let products = [];

function fetchProducts() {
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      products = data;
      filterProducts("All");
    })
    .catch((error) => console.error("Error fetching products:", error));
}

function setActiveButton(clickedButton) {
  const buttons = document.querySelectorAll(".filters button");

  buttons.forEach((button) => {
    button.classList.remove("active");
  });

  clickedButton.classList.add("active");
}

function filterProducts(category, button = null) {
  if (button) {
    setActiveButton(button);
  }

  const productList = document.getElementById("product-list");
  productList.innerHTML = "";

  const filteredProducts =
    category === "All"
      ? products
      : products.filter((p) => p.category === category);

  filteredProducts.forEach((product) => {
    const productItem = document.createElement("div");
    productItem.classList.add("product-item");
    productItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>Category: ${product.category}</p>
            <p class="price">$${product.price}</p>
        `;
    productList.appendChild(productItem);
  });
}

fetchProducts();

const addProductDialog = document.getElementById("add-product-dialog");
const addProductBtn = document.getElementById("add-product-btn");
const closeDialogBtn = document.getElementById("close-dialog-btn");
const addProductForm = document.getElementById("add-product-form");

addProductBtn.addEventListener("click", () => {
  addProductDialog.showModal();
});

closeDialogBtn.addEventListener("click", () => {
  addProductDialog.close();
});

addProductForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const category = document.getElementById("category").value;
  const price = document.getElementById("price").value;
  const image = document.getElementById("image").value;

  const newProduct = {
    name: name,
    category: category,
    price: parseFloat(price),
    image: image,
  };

  products.push(newProduct);

  filterProducts("All");
  addProductDialog.close();

  addProductForm.reset();
});
