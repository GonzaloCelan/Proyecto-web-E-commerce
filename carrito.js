import {removeLocalStorage,getFromLocalStorage,updateLocalStorage,saveLocalStorage} from "./storage.js";

const cartIcon = document.getElementById("cart-icon");
const cartSidebar = document.getElementById("cart-sidebar");
const cartOverlay = document.getElementById("cart-overlay");
const btnRemoveCart = document.getElementById("btn-remove-cart");
const btnCheckoutCart = document.getElementById("btn-checkout");


// despliega el sidebar del carrito de manera lateral
cartIcon.addEventListener("click", () => {
  cartSidebar.style.transform = "translateX(0)";
  cartOverlay.style.display = "block";
});

cartOverlay.addEventListener("click", () => {
  cartSidebar.style.transform = "translateX(100%)";
  cartOverlay.style.display = "none";
});

// limpia el carrito
btnRemoveCart.addEventListener("click", () => {
 removeLocalStorage();
 renderCartItems();
})

// confirma el pedido y limpia el carrito
btnCheckoutCart.addEventListener("click", () => {
removeLocalStorage();
renderCartItems();
 Swal.fire({
    title: "¡Gracias por su compra!",
    text: "Tu pedido ha sido procesado con éxito.",
    icon: "success",
    confirmButtonText: "Aceptar"
  });
})

// renderiza los productos del carrito almacenados en el local storage
export function renderCartItems() {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const cart = getFromLocalStorage(); 

  cartItemsContainer.innerHTML = ""; 
  let total = 0;

  cart.forEach(product => {
    const item = document.createElement("div");
    item.classList.add("border", "p-2", "rounded");

    const subtotal = product.price * product.quantity;
    total += subtotal;

    item.innerHTML = `
  <div class="d-flex justify-content-between align-items-center">
    <div class="d-flex align-items-start">
      <img
        src="${product.image}"
        alt="${product.title}"
        class="img-thumbnail me-3"
        style="width: 80px; height: 80px; object-fit: contain;"
      />
      <div>
        <h6 class="mb-1">${product.title}</h6>
        <div class="d-flex align-items-center gap-2">
          <button id="menos-${product.id}" class="btn btn-sm btn-outline-secondary" data-action="dec">-</button>
          <span id="cantidad-${product.id}" class="px-2" data-role="qty">${product.quantity}</span>
          <button id="mas-${product.id}" class="btn btn-sm btn-outline-secondary" data-action="inc">+</button>
          <button class="btn btn-sm btn-outline-danger" data-action="remove" id="btn-remove-product-${product.id}">
            <i class="bi bi-trash"></i>
          </button>
        </div>
        <strong class="text-primary d-block mt-1">Total: $${subtotal.toFixed(2)}</strong>
      </div>
    </div>
  </div>
`;

    cartItemsContainer.appendChild(item);

    const btnRemoveProduct = document.getElementById(`btn-remove-product-${product.id}`);
    btnRemoveProduct.addEventListener("click", () => {
      removeProductCartById(product.id);
    });

  });

  cartTotal.textContent = `$${total.toFixed(2)}`;
}

// elimina un producto del carrito por su ID

function removeProductCartById(productId) {
  const cart = getFromLocalStorage();
  const updatedCart = cart.filter(product => product.id !== productId);
  updateLocalStorage(updatedCart);
  renderCartItems();
}



