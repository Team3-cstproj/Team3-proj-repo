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
// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
// Get the container for product cards
const productsContainer = document.querySelector('.row-cols-2.row-cols-md-3.row-cols-lg-5.g-3');

// Clear existing static product cards
productsContainer.innerHTML = '';

// Get all products from data.js
const products = getAllProducts();

// Select featured products (we'll show the first 10)
const featuredProducts = products.slice(0, 10);

// Render each featured product
featuredProducts.forEach(product => {
  // Create and append product card
  productsContainer.innerHTML += `
    <div class="col">
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
    </div>
  `;
});
});

// Simple cart implementation
let cartItems = [];
let cartTotal = 0;

// Function to add product to cart
function addToCart(productId) {
// Find product by ID
const product = findProductById(productId);

// Check if product exists
if (product) {
  // Add to cart items
  cartItems.push(product);
  
  // Update cart total
  cartTotal += product.price;
  
  // Update cart UI
  updateCartUI();
  
  // Show cart sidebar
  // document.getElementById('cartSidebar').classList.add('active');
  // document.getElementById('cartOverlay').classList.add('active');
}
}

// Function to find product by ID
function findProductById(id) {
const products = getAllProducts();
return products.find(product => product.id === parseInt(id));
}

// Function to update cart UI
function updateCartUI() {
const cartContent = document.querySelector('.cart-content');

// Update cart items count in navbar
document.querySelectorAll('.cart-trigger sup span').forEach(span => {
  span.textContent = cartItems.length;
});

// Update cart total in navbar
document.querySelectorAll('.cart-trigger').forEach(trigger => {
  if (!trigger.querySelector('i')) {
    trigger.textContent = `$${cartTotal.toFixed(2)}`;
  }
});

// Clear cart content
cartContent.innerHTML = '';

// If cart is empty
if (cartItems.length === 0) {
  cartContent.innerHTML = '<p>Your cart is empty.</p>';
  return;
}

// Create a simple list of cart items
const itemsList = document.createElement('ul');
itemsList.className = 'cart-items-list';
itemsList.style.listStyle = 'none';
itemsList.style.padding = '0';

// Add items to list
cartItems.forEach((item, index) => {
  const listItem = document.createElement('li');
  listItem.className = 'cart-item';
  listItem.style.display = 'flex';
  listItem.style.justifyContent = 'space-between';
  listItem.style.alignItems = 'center';
  listItem.style.marginBottom = '10px';
  listItem.style.padding = '5px 0';
  listItem.style.borderBottom = '1px solid #eee';
  
  listItem.innerHTML = `
    <span>${item.name}</span>
    <div class="cart-item-actions">
      <span>$${item.price.toFixed(2)}</span>
      <button class="remove-btn" onclick="removeFromCart(${index})">x</button>
    </div>
  `;
  
  itemsList.appendChild(listItem);
});

// Create cart total section
const totalSection = document.createElement('div');
totalSection.className = 'cart-total';
totalSection.style.marginTop = '15px';
totalSection.style.paddingTop = '10px';
totalSection.style.borderTop = '1px solid #ddd';
totalSection.innerHTML = `
  <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
    <span><strong>Total:</strong></span>
    <span><strong>$${cartTotal.toFixed(2)}</strong></span>
  </div>
<button class="btn btn-primary w-100" onclick="checkout()">Checkout</button>`;

// Add to cart content
cartContent.appendChild(itemsList);
cartContent.appendChild(totalSection);
}

// Function to remove item from cart
function removeFromCart(index) {
// Subtract price from total
cartTotal -= cartItems[index].price;

// Remove item from array
cartItems.splice(index, 1);

updateCartUI();
}

// Function for checkout
function checkout() {
  // Redirect to another page
  window.location.href = 'checkout.html'; 
// Clear cart after checkout
cartItems = [];
cartTotal = 0;
updateCartUI();

// Close cart sidebar
document.getElementById('cartSidebar').classList.remove('active');
document.getElementById('cartOverlay').classList.remove('active');
}

// Initialize continue shopping button
document.addEventListener('DOMContentLoaded', function() {
document.getElementById('continueShopping').addEventListener('click', function(e) {
  e.preventDefault();
  document.getElementById('cartSidebar').classList.remove('active');
  document.getElementById('cartOverlay').classList.remove('active');
});
});