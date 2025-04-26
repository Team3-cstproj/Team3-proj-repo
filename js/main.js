//  cart list baby
const cartBtnList = document.querySelectorAll('.cart-trigger');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const closeCartBtn = document.getElementById('closeCart');

cartBtnList.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    cartSidebar.classList.add('active');
    cartOverlay.classList.add('active');
  });
});

closeCartBtn.addEventListener('click', () => {
  cartSidebar.classList.remove('active');
  cartOverlay.classList.remove('active');
});

cartOverlay.addEventListener('click', () => {
  cartSidebar.classList.remove('active');
  cartOverlay.classList.remove('active');
});



/ // ////////============================================================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {

  if (!localStorage.getItem('cart')) {
    localStorage.setItem('cart', JSON.stringify({ items: [], total: 0, count: 0 }));
  }
  // Render products
  const productsContainer = document.querySelector('.row-cols-2.row-cols-md-3.row-cols-lg-5.g-3');
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
                      <sup class="bg-light rounded-circle">
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

  // Update cart display on page load
  updateCartDisplay();
});

// Function to add product to cart
function addToCart(productId) {
  const product = findProductById(productId);
  if (!product) return;

  const cart = JSON.parse(localStorage.getItem('cart')) || { items: [], total: 0, count: 0 };

  const existingItem = cart.items.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.items.push({
      id: product.id,
      name: product.name,
      price: product.price,
      img: product.img,
      quantity: 1
    });
  }

  cart.total += product.price;
  cart.count += 1;

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartDisplay();
}

// Function to update cart display (navbar and sidebar)
function updateCartDisplay() {
  const cart = JSON.parse(localStorage.getItem('cart')) || { items: [], total: 0, count: 0 };

  document.querySelectorAll('.cart-trigger').forEach(trigger => {
    trigger.innerHTML = `
      <i class="fa-sharp fa-solid fa-bag-shopping"></i>
      <sup class="bg-light rounded-circle">
        <span class="text-dark">${cart.count}</span>
      </sup>
      <span class="cart-total ms-1">$${cart.total.toFixed(2)}</span>
    `;
  });

  updateCartSidebar(cart);
}

// Function to update cart sidebar content
function updateCartSidebar(cart) {
  const cartContent = document.querySelector(".cart-content");
  const cartFooter = document.querySelector(".cart-footer");

  if (cart.items.length === 0) {
    cartContent.innerHTML = "<p>Your cart is empty.</p>";
    cartFooter.innerHTML = `
      <a href="#" class="continue-shopping bg-primary" id="continueShopping">Continue Shopping</a>
    `;

    document.getElementById("continueShopping").addEventListener("click", function(e) {
      e.preventDefault();
      document.getElementById("cartSidebar").classList.remove("active");
      document.getElementById("cartOverlay").classList.remove("active");
    });

    return;
  }

  const itemsHtml = cart.items.map(item => `
    <div class="cart-item d-flex justify-content-between align-items-center mb-3">
      <div class="d-flex align-items-center">
        <img src="${item.img}" alt="${item.name}" width="60" height="60" class="me-3">
        <div>
          <h6 class="mb-0">${item.name}</h6>
          <small class="text-muted">$${item.price.toFixed(2)} × ${item.quantity}</small>
        </div>
      </div>
      <div>
        <span class="fw-bold">$${(item.price * item.quantity).toFixed(2)}</span>
      </div>
    </div>
  `).join('');

  cartContent.innerHTML = `
    <div class="cart-items">${itemsHtml}</div>
    <hr>
    <div class="d-flex justify-content-between fw-bold">
      <span>Total:</span>
      <span>$${cart.total.toFixed(2)}</span>
    </div>
  `;

  cartFooter.innerHTML = `
    <div class="d-flex flex-column gap-2">
      <a href="cart.html" class="btn btn-primary">View Cart</a>
    </div>
  `;
}

// Utility to find product by ID
function findProductById(id) {
  const products = getAllProducts();
  return products.find(product => product.id === parseInt(id));
}

////////===========================================================================================///
////btns color baby
document.addEventListener('DOMContentLoaded', function() {
document.querySelectorAll('.offer-banner .btn').forEach(button => {
  function activate() {
    button.style.backgroundColor = 'white';
    button.style.color = 'black';
  }

  function deactivate() {
    button.style.backgroundColor = 'transparent';
    button.style.color = 'white';
  }

  button.addEventListener('mousedown', activate);
  button.addEventListener('mouseup', deactivate);
  button.addEventListener('mouseleave', deactivate);
  button.addEventListener('touchstart', activate);
  button.addEventListener('touchend', deactivate);
});
});

////////===========================================================================================////
////logo baby
document.addEventListener('DOMContentLoaded', () => {
  const logoTrack = document.getElementById('logoTrack');
  const leftArrow = document.querySelector('.carousel-arrow.left');
  const rightArrow = document.querySelector('.carousel-arrow.right');
  const logoItems = document.querySelectorAll('.logo-item');
  let currentIndex = 0;
  let autoRotateInterval;
  
  // Clone first few items for infinite effect
  function cloneItemsForInfinite() {
      const itemsToClone = Array.from(logoItems).slice(0, 4);
      itemsToClone.forEach(item => {
          const clone = item.cloneNode(true);
          logoTrack.appendChild(clone);
      });
  }
  
  // Update carousel position
  function updateCarousel() {
      const logoWidth = logoItems[0].offsetWidth;
      const offset = -currentIndex * logoWidth;
      logoTrack.style.transform = `translateX(${offset}px)`;
      
      // Reset position if at the end (for infinite effect)
      if (currentIndex >= logoItems.length) {
          setTimeout(() => {
              logoTrack.style.transition = 'none';
              currentIndex = 0;
              updateCarousel();
              setTimeout(() => {
                  logoTrack.style.transition = 'transform 0.5s ease';
              }, 50);
          }, 500);
      }
  }
  
  // Move to next slide
  function moveNext() {
      currentIndex++;
      updateCarousel();
      resetAutoRotate();
  }
  
  // Move to previous slide
  function movePrev() {
      if (currentIndex <= 0) {
          // Jump to end for infinite effect
          logoTrack.style.transition = 'none';
          currentIndex = logoItems.length;
          updateCarousel();
          setTimeout(() => {
              logoTrack.style.transition = 'transform 0.5s ease';
              currentIndex--;
              updateCarousel();
          }, 50);
      } else {
          currentIndex--;
          updateCarousel();
      }
  }
  
  // Auto-rotate carousel
  function startAutoRotate() {
      autoRotateInterval = setInterval(moveNext, 2000);
  }
  
  // Reset auto-rotate timer
  function resetAutoRotate() {
      clearInterval(autoRotateInterval);
      startAutoRotate();
  }
  
  // Initialize
  cloneItemsForInfinite();
  startAutoRotate();
  
  // Event listeners
  leftArrow.addEventListener('click', movePrev);
  rightArrow.addEventListener('click', moveNext);
  
  // Handle window resize
  window.addEventListener('resize', () => {
      updateCarousel();
  });
  
  // Pause on hover
  logoTrack.addEventListener('mouseenter', () => {
      clearInterval(autoRotateInterval);
  });
  
  logoTrack.addEventListener('mouseleave', () => {
      startAutoRotate();
  });
});
/////======================================================================================================//
