const STORAGE_KEY = "favoritos";

// Inicializar favoritos
export function initialFavoritos() {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
  }
}

// Obtener favoritos
export function getFavoritos() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY));
}

// Guardar lista completa de favoritos
export function updateFavoritos(products) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

// Agregar o quitar producto de favoritos
export function toggleFavorito(product) {
  const favoritos = getFavoritos();
  const index = favoritos.findIndex(p => p.id === product.id);

  if (index === -1) {
    favoritos.push(product);
    updateFavoritos(favoritos);
    return true;
  } else {
    favoritos.splice(index, 1);
    updateFavoritos(favoritos);
    return false;
  }
}
