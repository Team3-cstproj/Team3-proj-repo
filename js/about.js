//
document.addEventListener('DOMContentLoaded', function () {
    // Run only if the product grid exists
    const productsContainer = document.querySelector('.row-cols-2.row-cols-md-3.row-cols-lg-5.g-3');
    
    if (productsContainer) {
      productsContainer.innerHTML = '';
  
      const products = getAllProducts();
      const featuredProducts = products.slice(0, 10);
  
      featuredProducts.forEach(product => {
        productsContainer.innerHTML += `
          <div class="col">
            <a href="product.html?id=${product.id}" class="text-decoration-none text-dark">
              <div class="card product-card" data-product-id="${product.id}">
                <img src="${product.img}" class="card-img-top" alt="${product.name}">
                <div class="hover-icons">
                  <a href="#" class="icon-btn cart-button" onclick="addToCart(${product.id}); return false;">
                    <i class="fas fa-shopping-cart"></i>
                    <span class="tooltip-text">Add to cart</span>
                    <span class="cart-circle">
                      <i class="fas fa-shopping-bag"></i>
                    </span>
                  </a>
                </div>
                <div class="card-body">
                  <h5 class="card-title">${product.name}</h5>
                  <p class="text-muted small">${product.category === 'men' ? 'Men' : 'Women'}</p>
                  <p class="card-text">$${product.price.toFixed(2)}</p>
                  <div class="star-rating">
                    <i class="far fa-star"></i>
                    <i class="far fa-star"></i>
                    <i class="far fa-star"></i>
                    <i class="far fa-star"></i>
                    <i class="far fa-star"></i>
                  </div>
                </div>
              </div>
            </a>
          </div>
        `;
      });
    }
  
    // This part runs always, even if no product grid
    updateCartDisplay();
  });
 