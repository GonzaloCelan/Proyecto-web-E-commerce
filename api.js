export async function getProducts() {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    return data; 
  } catch (err) {
    console.error("Error al obtener productos:", err);
    return [];
  }
}