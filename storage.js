const STORAGE_KEY = "cart";

// funcion para inicializar el local storage
export function initialLocalStorage(){

    if(!localStorage.getItem(STORAGE_KEY))
    {
        localStorage.setItem(STORAGE_KEY,JSON.stringify([]))
    }
}

// funcion para obtener el carrito
export function getFromLocalStorage(){
    return JSON.parse(localStorage.getItem(STORAGE_KEY));
}

// funcion para guardar un producto en el local storage
export function saveLocalStorage(product){
    let cart = JSON.parse(localStorage.getItem(STORAGE_KEY));

    if(!Array.isArray(cart)){
        cart = []
    }else{
        cart.push(product);
        localStorage.setItem(STORAGE_KEY,JSON.stringify(cart));
    }
    
}

// funcion para actualizar el carrito, si se actualiza la cantidad de  un producto o se elimina

export function updateLocalStorage(products){
  
  return localStorage.setItem(STORAGE_KEY,JSON.stringify(products))
    
}

// funcion para limpiar el carrito 
export function removeLocalStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([])); 
}