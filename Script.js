
// Importaciones de funciones
import  {initialLocalStorage, saveLocalStorage, getFromLocalStorage} from "./storage.js";
import { getProducts } from "./api.js"; 
import {quantityProduct } from "./modal.js";
import {renderCartItems} from "./carrito.js";
import { addProductCart } from "./carrito.js";

// Fetch


const productsContainer = document.getElementById("products-container");


export let allProducts = []; // Guardar los productos para habilitar el filtro.

export async function loadProducts() {
  try {
    
    allProducts = await getProducts();
    renderProducts(allProducts); 
  } catch (err) {
    console.error("Error al cargar productos:", err);
  }
}

// Tarjetas de producto
function createProductCard(product) {
  const card = document.createElement("div");
  card.className = "card";
  card.style.width = "18rem";

  card.innerHTML = `
        <div class="img-container">
            <img src="${product.image}" class="card-img-top product-image-clickable" alt="${product.title}">
        </div>
        <div class="card-body">
            <h5 class="card-title">${product.title}</h5>
            <p class="card-text"><strong>Precio:</strong> $${product.price.toFixed(2)}</p>
            <p class="card-text"><strong>Categoria:</strong> ${product.category}</p>
            <div class="buttons-top">
                <button class="btn btn-primary btn-buy">Comprar ahora</button>
                <button id="btn-add-product-${product.id}" class="btn btn-primary btn-cart" title="Agregar al carrito"">
                    <i class="bi bi-cart-plus-fill"></i>
                </button>
                <button class="btn btn-danger btn-fav" title="Favoritos">
                    <i class="bi bi-heart-fill"></i>
                </button>
            </div>
        </div>
    `;
 
  // La imágen de cada producto abre el modal
  const productImage = card.querySelector(".product-image-clickable");
  productImage.addEventListener("click", () => {
    openProductModal(product);
    quantityProduct();
    addProductCart(product);
  });

  return card;
}

// Función para mostrar productos
function renderProducts(products) {
  productsContainer.innerHTML = "";

  if (products.length === 0) {
    // Mostrar un mensaje informativo avisando que no hay productos
    const noResultsMessage = document.createElement("div");
    noResultsMessage.className = "no-results-message";
    noResultsMessage.textContent =
      "No se encontraron productos con el nombre ingresado";
    productsContainer.appendChild(noResultsMessage);
  } else {
    products.forEach((product) => {
      const card = createProductCard(product);
      productsContainer.appendChild(card);
    });
  }
}

// Filtrar
const searchInput = document.getElementById("search-input");
searchInput.addEventListener("input", (e) => {
  const searchQuery = e.target.value.toLowerCase().trim();

  if (searchQuery === "") {
    // Si no hay búsqueda, se muestran todos los productos.
    renderProducts(allProducts);
  } else {
    // filtrar productos, case-insensitive
    const filteredProducts = allProducts.filter((product) =>
      product.title.toLowerCase().includes(searchQuery),
    );
    renderProducts(filteredProducts);
  }
});

const productModal = new bootstrap.Modal(
  document.getElementById("product-detail-modal"),
);

function openProductModal(product) {
  document.getElementById("modal-product-image").src = product.image;
  document.getElementById("modal-product-image").alt = product.title;
  document.getElementById("modal-product-title").textContent = product.title;
  document.getElementById("modal-product-description").textContent =
    product.description;
  document.getElementById("modal-product-price").textContent =
    product.price.toFixed(2);
  document.getElementById("producto-cantidad-modal").textContent = 1;
  // Mostrar el modal
  productModal.show();
}

// Cerrar el modal con la tecla ESC, siguiendo buenas prácticas de UX
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    productModal.hide();
  }

});


// Renderiza los productos y despues inicializa el localStorage del carrito
renderCartItems();
initialLocalStorage();
loadProducts();