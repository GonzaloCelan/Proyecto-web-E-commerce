import {getFromLocalStorage, saveLocalStorage,updateLocalStorage,removeLocalStorage} from "./storage.js";
import{renderCartItems} from "./carrito.js";


// Funcion para actualizar la cantidad de productos 
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

// Funcion para agregar productos al carrito

export function addProductCart (product){

     const btnAddProduct = document.getElementById(`btn-add-cart-modal`);
     const qtyProduct = document.getElementById("producto-cantidad-modal");

      btnAddProduct.addEventListener("click",() => {
        const cart = getFromLocalStorage();
        const productExist = cart.some(p => p.id === product.id);
        if (!productExist) {
        product.quantity = parseInt(qtyProduct.textContent);
        saveLocalStorage(product);
        renderCartItems(); 
        Swal.fire({
            title: "¡Producto añadido!",
            icon: "success"
  });
       
      } else {
        const updateCart = cart.filter(p => p.id != product.id);
        product.quantity = parseInt(qtyProduct.textContent);
        updateCart.push(product);
        updateLocalStorage(updateCart);
        renderCartItems(); 
        Swal.fire ({
            title: "¡Producto actualizado!",
            icon: "success"
        });
      }
    })
}

// Funcion para eliminar productos del carrito
export function removeProductCart (product){

    const btnRemoveProduct = document.getElementById("btn-remove-cart");

    btnRemoveProduct.addEventListener("click",() => {
        const cart = getFromLocalStorage();
        const productExist = cart.some(p => p.id === product.id);
        if (productExist) {
        const updateCart = cart.filter(p => p.id != product.id);
        updateLocalStorage(updateCart);
      } else {
      console.warn("Este producto no existe en el carrito");
      }
    })
}

