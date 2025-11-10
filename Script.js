// Fetch
const productsContainer = document.getElementById('products-container');
fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(products => {
        products.forEach(product => {
            const card = createProductCard(product);
            productsContainer.appendChild(card);
        });
    })
    .catch(err => console.error(err));

// Tarjetas de producto
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'card';
    card.style.width = '18rem';

    card.innerHTML = `
        <div class="img-container">
            <img src="${product.image}" class="card-img-top" alt="${product.title}">
        </div>
        <div class="card-body">
            <h5 class="card-title">${product.title}</h5>
            <p class="card-text"><strong>Precio:</strong> $${product.price.toFixed(2)}</p>
            <p class="card-text"><strong>Categoria:</strong> ${product.category}</p>
            <div class="buttons-top">
                <button class="btn btn-primary btn-buy">Comprar ahora</button>
                <button class="btn btn-primary btn-cart" title="Agregar al carrito">
                    <i class="bi bi-cart-plus-fill"></i>
                </button>
                <button class="btn btn-danger btn-fav" title="Favoritos">
                    <i class="bi bi-heart-fill"></i>
                </button>
            </div>
        </div>
    `;

    return card;
}


