const productsContainer = document.getElementById('products-container');

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
            <div class="description-container" style="display:none;">
                <p class="card-text">${product.description}</p>
                <p class="card-text"><strong>Rating:</strong> ${product.rating.rate} ⭐ (${product.rating.count} reviews)</p>
            </div>
            <div class="d-flex flex-wrap gap-2 mt-2">
                <button class="btn btn-info btn-desc">Descripción</button>
                <button class="btn btn-success btn-cart">Agregar al carrito</button>
                <button class="btn btn-warning btn-fav">Favoritos</button>
                <button class="btn btn-primary btn-buy">Comprar ahora</button>
            </div>
        </div>
    `;

    const btnDesc = card.querySelector('.btn-desc');
    const descContainer = card.querySelector('.description-container');
    btnDesc.addEventListener('click', () => {
        if(descContainer.style.display === 'none') {
            descContainer.style.display = 'block';
            btnDesc.textContent = 'Ocultar descripción';
        } else {
            descContainer.style.display = 'none';
            btnDesc.textContent = 'Descripción';
        }
    });

    return card;
}

// Fetch API
fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(products => {
        products.forEach(product => {
            const card = createProductCard(product);
            productsContainer.appendChild(card);
        });
    })
    .catch(err => console.error(err));
