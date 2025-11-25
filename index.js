// Importaciones de funciones
import  {initialLocalStorage, getFromLocalStorage, updateLocalStorage} from "./storage/storage.js";
import { getProducts } from "./api/api.js";
import {quantityProduct } from "./componentes/modal.js";
import {renderCartItems } from "./componentes/carrito.js";
import { addProductCart } from "./componentes/modal.js";
import { initialFavoritos, getFavoritos, toggleFavorito } from "./componentes/favoritos.js";

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
                <button id="btn-add-product-${product.id}" class="btn btn-primary btn-cart" title="Agregar al carrito">
                    <i class="bi bi-cart-plus-fill"></i>
                </button>
                <button class="btn btn-danger btn-fav" title="Favoritos">
                    <i class="bi bi-heart-fill"></i>
                </button>
            </div>
        </div>
    `;

  const btnFav = card.querySelector(".btn-fav");
  const favoritos = getFavoritos();
  if (favoritos.some(p => p.id === product.id)) {
    btnFav.classList.add("text-danger");
  }

  btnFav.addEventListener("click", () => {
    const added = toggleFavorito(product);
    btnFav.classList.toggle("fav-active", added);
    renderFavoritesBadge();
  });

  const productImage = card.querySelector(".product-image-clickable");
  productImage.addEventListener("click", () => {
    openProductModal(product);
    quantityProduct();
    addProductCart(product);
  });

  const btnAddCart = card.querySelector(`#btn-add-product-${product.id}`);
  btnAddCart.addEventListener("click", () => addProductToCartPlusOne(product));

  // Botón “Comprar ahora”
  const btnBuy = card.querySelector(".btn-buy");
  btnBuy.addEventListener("click", () => buyNow(product));

  return card;
}

// Función para comprar ahora
function buyNow(product) {
  let detalle = `${product.title} x1 = $${product.price.toFixed(2)}\n`;
  detalle += `\nTotal: $${product.price.toFixed(2)}`;

  Swal.fire({
    title: "Confirma tu compra",
    icon: "question",
    html: `<pre style="text-align:left">${detalle}</pre>`,
    showCancelButton: true,
    confirmButtonText: "Confirmar",
    cancelButtonText: "Cancelar"
  }).then(result => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "¡Gracias por su compra!",
        text: "Tu pedido ha sido procesado con éxito.",
        icon: "success",
        confirmButtonText: "Aceptar"
      });
    }
  });
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

// Función para agregar +1 del producto al carrito desde la tarjeta
function addProductToCartPlusOne(product) {
  const cart = getFromLocalStorage();
  const index = cart.findIndex(p => p.id === product.id);

  if (index === -1) {
    // Producto no existe en el carrito, agregarlo con cantidad 1
    const newProduct = {
      ...product,
      quantity: 1
    };
    cart.push(newProduct);
    updateLocalStorage(cart);
    renderCartItems();
    Swal.fire({
      title: "¡Producto añadido!",
      icon: "success"
    });
  } else {
    // Producto ya existe, incrementar cantidad en 1
    cart[index].quantity += 1;
    updateLocalStorage(cart);
    renderCartItems();
    Swal.fire({
      title: "¡Producto actualizado!",
      icon: "success"
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

export const productModal = new bootstrap.Modal(
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

const profileIcon = document.querySelector(".bi-person-circle");
const profileMenu = document.getElementById("profile-menu");
const profileForm = document.getElementById("profile-form");
const profileWelcome = document.getElementById("profile-welcome");
const usernameInput = document.getElementById("username-input");
const btnLogin = document.getElementById("btn-login");
const btnLogout = document.getElementById("btn-logout");
const welcomeMessage = document.getElementById("welcome-message");

// Mostrar menu de perfil
profileIcon.addEventListener("click", () => {
    profileMenu.style.display = profileMenu.style.display === "none" ? "block" : "none";
    checkLogin();
});

// Función para chequear si ya hay usuario en localStorage
function checkLogin() {
    const username = localStorage.getItem("username");
    if (username) {
        profileForm.style.display = "none";
        profileWelcome.style.display = "block";
        welcomeMessage.textContent = `Bienvenido, ${username}`;
    } else {
        profileForm.style.display = "block";
        profileWelcome.style.display = "none";
    }
}

// Ingresar nombre
btnLogin.addEventListener("click", () => {
    const username = usernameInput.value.trim();
    if (username) {
        if (username.length > 50) {
            alert('El nombre de usuario no puede exceder los 50 caracteres.');
            return;
        }
        localStorage.setItem("username", username);
        usernameInput.value = "";
        checkLogin();
    }
});


// Cerrar sesión
btnLogout.addEventListener("click", () => {
    localStorage.removeItem("username");
    checkLogin();
});

// Cerrar perfil al hacer clic fuera
document.addEventListener("click", (e) => {
    const isClickInsideProfile = profileMenu.contains(e.target) || profileIcon.contains(e.target);
    if (!isClickInsideProfile) {
        profileMenu.style.display = "none";
    }
});

function renderFavoritesBadge() {
  const favBadge = document.getElementById("fav-badge");
  const count = getFavoritos().length;

  if (count > 0) {
    favBadge.textContent = count;
    favBadge.style.display = "block";
  } else {
    favBadge.style.display = "none";
  }
}

function syncFavoriteButtons() {
  const cards = document.querySelectorAll(".card");
  const favoritos = getFavoritos();

  cards.forEach(card => {
    const btnFav = card.querySelector(".btn-fav");
    const productId = Number(card.querySelector(".btn-cart").id.replace("btn-add-product-", ""));

    if (favoritos.some(p => p.id === productId)) {
      btnFav.classList.add("fav-active");
    } else {
      btnFav.classList.remove("fav-active");
    }
  });
}



const favIcon = document.querySelector(".bi-bookmark-fill");
const favSidebar = document.getElementById("fav-sidebar");
const favOverlay = document.getElementById("fav-overlay");
const favItemsContainer = document.getElementById("fav-items");
const btnClearFav = document.getElementById("btn-clear-fav");

// Abrir sidebar de favoritos
favIcon.addEventListener("click", () => {
    favSidebar.style.transform = "translateX(0)";
    favOverlay.style.display = "block";
    renderFavItems();
});

// Cerrar sidebar al hacer clic fuera
favOverlay.addEventListener("click", () => {
    favSidebar.style.transform = "translateX(100%)";
    favOverlay.style.display = "none";
});

function renderFavItems() {
    const favoritos = getFavoritos();
    favItemsContainer.innerHTML = "";

    if (favoritos.length === 0) {
        favItemsContainer.innerHTML = `<p class="text-muted">No hay favoritos aún</p>`;
        return;
    }

    favoritos.forEach(product => {
        const item = document.createElement("div");
        item.classList.add("border", "p-2", "rounded", "d-flex", "align-items-center", "gap-2");
        item.style.cursor = "pointer";

        item.innerHTML = `
            <img src="${product.image}" alt="${product.title}" style="width: 60px; height: 60px; object-fit: contain;">
            <div class="flex-grow-1">
                <h6 class="mb-1">${product.title}</h6>
                <p class="mb-0 text-primary">$${product.price.toFixed(2)}</p>
            </div>
            <button class="btn btn-sm btn-outline-danger" title="Quitar"><i class="bi bi-trash"></i></button>
        `;

        const btnRemove = item.querySelector("button");
        btnRemove.addEventListener("click", (e) => {
          e.stopPropagation();
          toggleFavorito(product);
          renderFavoritesBadge();
          renderFavItems();
          syncFavoriteButtons();
        });


        // Abrir modal al clickear sobre el item (excepto el botón de quitar)
        item.addEventListener("click", () => {
            openProductModal(product);
            quantityProduct();
            addProductCart(product);
        });

        favItemsContainer.appendChild(item);
    });
}


// Limpiar todos los favoritos
btnClearFav.addEventListener("click", () => {
    const favoritos = getFavoritos();
    favoritos.forEach(p => toggleFavorito(p));
    renderFavoritesBadge();
    renderFavItems();
    syncFavoriteButtons();
});



// Renderiza los productos y despues inicializa el localStorage del carrito
document.addEventListener("DOMContentLoaded", () => {
  loadProducts();
  initialLocalStorage();
  initialFavoritos(); 
  renderCartItems();
  renderFavoritesBadge();
  checkLogin();
});