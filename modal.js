import {getFromLocalStorage, saveLocalStorage,updateLocalStorage} from "./storage.js";
import{renderCartItems} from "./carrito.js";
import { productModal } from "./index.js";


// Funcion para elegir la cantidad de productos dentro del modal
export function quantityProduct () {

  let cantidad = 1;
  const qtyProduct = document.getElementById("producto-cantidad-modal");
  const btnMas = document.getElementById("btn-mas-modal");
  const btnMenos = document.getElementById("btn-menos-modal");


  btnMas.onclick = () => {
    cantidad++;
    qtyProduct.textContent = cantidad;
  };

  btnMenos.onclick = () => {
    if (cantidad > 1) {
      cantidad--;
      qtyProduct.textContent = cantidad;
    }
  };

}


// Funcion para agregar productos al carrito y actualizar la cantidad si ya existe

export function addProductCart(product) {
  const btnAddProduct = document.getElementById("btn-add-cart-modal");
  const qtyProduct   = document.getElementById("producto-cantidad-modal");

 
  btnAddProduct.onclick = () => {
    const cart = getFromLocalStorage();

    const newQty = parseInt(qtyProduct.value ?? qtyProduct.textContent,10) || 1;

    const index = cart.findIndex(p => p.id === product.id);

    if (index === -1) {
  
      const newProduct = {
        ...product,
        quantity: newQty
      };

      cart.push(newProduct);
      updateLocalStorage(cart);
      renderCartItems();
      productModal.hide();
      Swal.fire({
        title: "¡Producto añadido!",
        icon: "success"
      });

    } else {
      const productUpdate = cart.find(p => p.id === product.id);

      const productUpdated = {
        ...productUpdate,
        quantity: productUpdate.quantity + newQty
      };
      cart[index] = productUpdated;

      updateLocalStorage(cart);
      renderCartItems();
      productModal.hide();
      Swal.fire({
        title: "¡Producto actualizado!",
        icon: "success"
      });
    }
  };
}

