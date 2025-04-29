// Cart functionality
document.addEventListener("DOMContentLoaded", function() {
  // Initialize cart first thing
  initializeCart();
  
  const cartBtnList = document.querySelectorAll(".cart-trigger");
  const cartSidebar = document.getElementById("cartSidebar");
  const cartOverlay = document.getElementById("cartOverlay");
  const closeCartBtn = document.getElementById("closeCart");

  // Check if cart elements exist before adding listeners
  if (cartBtnList.length > 0 && cartSidebar && cartOverlay) {
    cartBtnList.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        cartSidebar.classList.add("active");
        cartOverlay.classList.add("active");
        updateCartDisplay(); // Update cart display when opening
      });
    });

    if (closeCartBtn) {
      closeCartBtn.addEventListener("click", () => {
        cartSidebar.classList.remove("active");
        cartOverlay.classList.remove("active");
      });
    }

    cartOverlay.addEventListener("click", () => {
      cartSidebar.classList.remove("active");
      cartOverlay.classList.remove("active");
    });
  }

  // Banner button effects
  document.querySelectorAll(".offer-banner .btn").forEach((button) => {
    function activate() {
      button.style.backgroundColor = "white";
      button.style.color = "black";
    }

    function deactivate() {
      button.style.backgroundColor = "transparent";
      button.style.color = "white";
    }

    button.addEventListener("mousedown", activate);
    button.addEventListener("mouseup", deactivate);
    button.addEventListener("mouseleave", deactivate);
    button.addEventListener("touchstart", activate);
    button.addEventListener("touchend", deactivate);
  });

  // Initialize components
  setupUserProfile();
  setupHomepageCartButtons();
  setupProductCardClick();
  loadProductDetails();
});

// Cart initialization function
function initializeCart() {
  if (!sessionStorage.getItem('cart')) {
    sessionStorage.setItem('cart', JSON.stringify({
      items: [],
      total: 0,
      count: 0
    }));
  }
  updateCartDisplay();
}

// User profile dropdown functionality
function setupUserProfile() {
  const userIcon = document.querySelector(".nav-link[href='login.html']");
  const userData = JSON.parse(sessionStorage.getItem('currentUser')); 
  
  if (!userIcon) return;

  // Create user profile dropdown container
  const profileDropdown = document.createElement('div');
  profileDropdown.className = 'profile-dropdown';
  profileDropdown.style.display = 'none';
  profileDropdown.style.position = 'absolute';
  profileDropdown.style.right = '0';
  profileDropdown.style.top = '100%';
  profileDropdown.style.backgroundColor = 'white';
  profileDropdown.style.border = '1px solid #ddd';
  profileDropdown.style.borderRadius = '4px';
  profileDropdown.style.padding = '10px';
  profileDropdown.style.zIndex = '1000';
  profileDropdown.style.minWidth = '200px';
  profileDropdown.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
  
  if (userData) {
    // User is logged in
    profileDropdown.innerHTML = `
      <div class="user-info mb-2">
        <p class="mb-1"><strong>${userData.name || 'User'}</strong></p>
        <p class="small text-muted mb-2">${userData.email || ''}</p>
        <p class="small">Role: ${userData.role || 'user'}</p>
      </div>
      <button id="logoutBtn" class="btn btn-sm btn-danger w-100">Logout</button>
    `;
    
    userIcon.innerHTML = '<i class="fa-solid fa-user-check"></i>';
    userIcon.href = '#';
    
    profileDropdown.querySelector('#logoutBtn').addEventListener('click', () => {
      sessionStorage.removeItem('currentUser');
      window.location.href = 'login.html';
    });
  } else {
    // User is not logged in
    profileDropdown.innerHTML = `
      <p class="mb-2">You are not logged in</p>
      <a href="login.html" class="btn btn-sm btn-primary w-100">Login</a>
    `;
  }
  
  userIcon.parentNode.appendChild(profileDropdown);
  
  // Toggle dropdown on click
  userIcon.addEventListener('click', (e) => {
    e.preventDefault();
    const isVisible = profileDropdown.style.display === 'block';
    profileDropdown.style.display = isVisible ? 'none' : 'block';
  });
  
  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!userIcon.contains(e.target) && !profileDropdown.contains(e.target)) {
      profileDropdown.style.display = 'none';
    }
  });
}

// Product Details Page functionality
function loadProductDetails() {
  const productImageContainer = document.querySelector(".product-image");
  if (!productImageContainer) return; // Not on product page
  
  try {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    
    if (products.length === 0) {
      console.error("No products found in localStorage");
      return;
    }
    
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    
    let product;
    if (productId) {
      product = products.find(p => p.id === productId);
    }
    
    if (!product) {
      product = products[0]; // Use first product if no match or no ID
    }
    
    if (product) {
      displayProductDetails(product);
      setupAddToCart(product);
      displayRelatedProducts(product);
    }
  } catch (error) {
    console.error("Error loading product details:", error);
  }
}

function displayProductDetails(product) {
  try {
    // Update main product image
    const mainImage = document.querySelector(".product-image img");
    if (mainImage) {
      mainImage.src = product.img;
      mainImage.alt = product.name;
    }

    // Update breadcrumb
    const breadcrumb = document.querySelector(".breadcrumb .active");
    if (breadcrumb) {
      breadcrumb.textContent = product.name;
    }

    // Update category link
    const categoryLinks = document.querySelectorAll("#h2-link");
    if (categoryLinks.length > 0) {
      categoryLinks.forEach(link => {
        link.textContent = product.category.charAt(0).toUpperCase() + product.category.slice(1);
        link.href = `catalog-${product.category}.html`;
      });
    }

    // Update product title
    const productTitle = document.querySelector(".product-title");
    if (productTitle) {
      productTitle.textContent = product.name;
    }

    // Update product price
    const productPrice = document.querySelector(".product-price");
    if (productPrice) {
      productPrice.textContent = `$${product.price.toFixed(2)}`;
    }

    // Update description images 
    const descImages = document.querySelectorAll("#description-product-img");
    if (descImages.length > 0) {
      descImages.forEach(img => {
        img.src = product.img;
        img.alt = product.name;
      });
    }

    // Update additional info tab
    updateAdditionalInfo(product);
  } catch (error) {
    console.error("Error displaying product details:", error);
  }
}

function updateAdditionalInfo(product) {
  const additionalInfoTab = document.querySelector("#additional-info-tab-pane tbody");
  if (additionalInfoTab) {
    additionalInfoTab.innerHTML = `
      <tr>
        <th scope="row" style="width: 30%">Category</th>
        <td>${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</td>
      </tr>
      <tr>
        <th scope="row">Price</th>
        <td>$${product.price.toFixed(2)}</td>
      </tr>
      <tr>
        <th scope="row">Available</th>
        <td>${product.availible} items</td>
      </tr>
    `;
  }
}

// Homepage cart buttons
function setupHomepageCartButtons() {
  document.querySelectorAll(".cart-button").forEach((button) => {
    button.addEventListener("click", function(e) {
      e.preventDefault();
      const card = button.closest(".product-card");
      const productName = card.querySelector(".card-title")?.textContent.trim();
      const productPrice = parseFloat(card.querySelector(".card-text")?.textContent.replace('$', ''));
      const productImg = card.querySelector(".card-img-top")?.getAttribute('src');

      if (productName && !isNaN(productPrice) && productImg) {
        const product = {
          id: Date.now(),
          name: productName,
          price: productPrice,
          img: productImg,
          quantity: 1
        };

        addToCart(product, 1);
        showAddToCartConfirmation(product.name, 1);
        updateCartDisplay();
      }
    });
  });
}

// Add to cart functionality
function setupAddToCart(product) {
  const addToCartBtn = document.querySelector(".add-to-cart-btn");
  if (addToCartBtn) {
    addToCartBtn.addEventListener("click", function() {
      const quantityInput = document.getElementById("quantity");
      const quantity = parseInt(quantityInput ? quantityInput.value : 1) || 1;
      
      addToCart(product, quantity);
      showAddToCartConfirmation(product.name, quantity);
      updateCartDisplay();
    });
  }
}

function showAddToCartConfirmation(productName, quantity) {
  // Create or get toast container
  let toastContainer = document.getElementById('toastContainer');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toastContainer';
    toastContainer.style.position = 'fixed';
    toastContainer.style.bottom = '20px';
    toastContainer.style.right = '20px';
    toastContainer.style.zIndex = '1050';
    document.body.appendChild(toastContainer);
  }
  
  // Create toast
  const toast = document.createElement('div');
  toast.className = 'toast show';
  toast.role = 'alert';
  toast.ariaLive = 'assertive';
  toast.ariaAtomic = 'true';
  toast.style.backgroundColor = '#fff';
  toast.style.color = '#000';
  toast.style.minWidth = '250px';
  toast.style.margin = '10px';
  toast.style.boxShadow = '0 0.5rem 1rem rgba(0, 0, 0, 0.15)';
  toast.style.borderRadius = '0.25rem';
  toast.style.opacity = '1';
  
  toast.innerHTML = `
    <div class="toast-header">
      <strong class="me-auto">Success!</strong>
      <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <div class="toast-body">
      Added ${quantity} ${quantity > 1 ? 'items' : 'item'} of ${productName} to your cart.
    </div>
  `;
  
  toastContainer.appendChild(toast);
  
  toast.querySelector('.btn-close').addEventListener('click', function() {
    toastContainer.removeChild(toast);
  });
  
  setTimeout(() => {
    if (toast.parentNode === toastContainer) {
      toastContainer.removeChild(toast);
    }
  }, 3000);
}
// Modified addToCart function to handle quantities properly
function addToCart(product, quantity) {
  try {
    const cart = JSON.parse(sessionStorage.getItem('cart')) || { items: [], total: 0, count: 0 };
    
    // Check if product already in cart
    const existingItemIndex = cart.items.findIndex(item => 
      // Compare by product ID if available, otherwise use name as fallback
      (item.id === product.id) || (item.name === product.name && item.price === product.price)
    );
    
    if (existingItemIndex !== -1) {
      // Update quantity instead of adding new item
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // Add as new item
      cart.items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        img: product.img,
        quantity: quantity
      });
    }
    
    // Update cart totals
    cart.total = calculateCartTotal(cart.items);
    cart.count = calculateCartCount(cart.items);
    
    sessionStorage.setItem('cart', JSON.stringify(cart));
  } catch (error) {
    console.error("Error adding to cart:", error);
  }
}
// Helper functions to calculate cart totals
function calculateCartTotal(items) {
  return items.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function calculateCartCount(items) {
  return items.reduce((count, item) => count + item.quantity, 0);
}

function updateCartDisplay() {
  try {
    const cart = JSON.parse(sessionStorage.getItem('cart')) || { items: [], total: 0, count: 0 };
    
    // Update cart count in navbar 
    const cartTrigger = document.querySelector(".cart-trigger");
    if (cartTrigger) {
      cartTrigger.innerHTML = `
        <i class="fa-sharp fa-solid fa-bag-shopping"></i>
        <sup class="bg-light rounded-circle">
          <span class="text-dark">${cart.count}</span>
        </sup>
        <span class="cart-total ms-1">$${cart.total.toFixed(2)}</span>
      `;
    }
    
    // Update cart sidebar content if it exists
    const cartContent = document.querySelector(".cart-content");
    const cartFooter = document.querySelector(".cart-footer");
    if (cartContent && cartFooter) {
      updateCartSidebar(cart, cartContent, cartFooter);
    }
  } catch (error) {
    console.error("Error updating cart display:", error);
    // Reset cart if corrupted
    sessionStorage.setItem('cart', JSON.stringify({ items: [], total: 0, count: 0 }));
  }
}
// Updated updateCartSidebar function to display quantity × price format
function updateCartSidebar(cart, cartContent, cartFooter) {
  const cartSidebar = document.getElementById("cartSidebar");
  const cartOverlay = document.getElementById("cartOverlay");
  
  if (cart.items.length === 0) {
    cartContent.innerHTML = "<p>Your cart is empty.</p>";
    cartFooter.innerHTML = `
      <a href="#" class="continue-shopping bg-primary" id="continueShopping">Continue Shopping</a>
    `;
    
    const continueShoppingBtn = document.getElementById("continueShopping");
    if (continueShoppingBtn && cartSidebar && cartOverlay) {
      continueShoppingBtn.addEventListener("click", function(e) {
        e.preventDefault();
        cartSidebar.classList.remove("active");
        cartOverlay.classList.remove("active");
      });
    }
  } else {
    let html = `
      <div class="cart-items">
        ${cart.items.map(item => `
          <div class="cart-item d-flex justify-content-between align-items-center mb-3">
            <div class="d-flex align-items-center">
              <img src="${item.img}" alt="${item.name}" width="60" height="60" class="me-3">
              <div>
                <h6 class="mb-0">${item.name}</h6>
                <small class="text-muted">$${item.price.toFixed(2)} × ${item.quantity}</small>
              </div>
            </div>
            <div class="d-flex align-items-center">
              <span class="fw-bold me-2">$${(item.price * item.quantity).toFixed(2)}</span>
              <button class="btn btn-sm btn-outline-danger remove-item" data-id="${item.id}">
                <i class="fa-solid fa-times"></i>
              </button>
            </div>
          </div>
        `).join('')}
      </div>
      <hr>
      <div class="d-flex justify-content-between fw-bold">
        <span>Total:</span>
        <span>$${cart.total.toFixed(2)}</span>
      </div>
    `;
    
    cartContent.innerHTML = html;
    
    cartFooter.innerHTML = `
      <div class="d-flex flex-column gap-2">
        <a href="cart.html" class="btn btn-primary">View Cart</a>
      </div>
    `;
    
    document.querySelectorAll(".remove-item").forEach(button => {
      button.addEventListener("click", function() {
        const itemId = parseInt(this.getAttribute("data-id"));
        removeCartItem(itemId);
      });
    });
  }
}
//// New function for cart page display
function renderCartPage() {
  const cartTableBody = document.querySelector(".cart-table tbody");
  if (!cartTableBody) return; // Not on cart page
  
  try {
    const cart = JSON.parse(sessionStorage.getItem('cart')) || { items: [], total: 0, count: 0 };
    
    if (cart.items.length === 0) {
      document.querySelector(".cart-container").innerHTML = `
        <div class="text-center py-5">
          <h3>Your cart is empty</h3>
          <p class="mt-3">Add some products to your cart and come back here.</p>
          <a href="catalog-Everything.html" class="btn btn-primary mt-3">Continue Shopping</a>
        </div>
      `;
      return;
    }
    
    // Clear existing rows
    cartTableBody.innerHTML = "";
    
    // Add each item as a row
    cart.items.forEach(item => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td class="product-col">
          <div class="d-flex align-items-center">
            <img src="${item.img}" alt="${item.name}" width="80" height="80" class="me-3">
            <h5 class="mb-0">${item.name}</h5>
          </div>
        </td>
        <td class="price-col">$${item.price.toFixed(2)}</td>
        <td class="quantity-col">
          <div class="quantity-control d-flex align-items-center">
            <button class="btn btn-sm btn-outline-secondary decrease-qty" data-id="${item.id}">-</button>
            <span class="mx-2">${item.quantity}</span>
            <button class="btn btn-sm btn-outline-secondary increase-qty" data-id="${item.id}">+</button>
          </div>
        </td>
        <td class="total-col">$${(item.price * item.quantity).toFixed(2)}</td>
        <td class="remove-col">
          <button class="btn btn-sm btn-danger remove-item" data-id="${item.id}">
            <i class="fa-solid fa-times"></i>
          </button>
        </td>
      `;
      cartTableBody.appendChild(row);
    });
    
    // Update cart summary section
    const cartSummary = document.querySelector(".cart-summary");
    if (cartSummary) {
      cartSummary.innerHTML = `
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Cart Summary</h5>
            <div class="d-flex justify-content-between mb-2">
              <span>Subtotal:</span>
              <span>$${cart.total.toFixed(2)}</span>
            </div>
            <div class="d-flex justify-content-between mb-3">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <hr>
            <div class="d-flex justify-content-between fw-bold mb-3">
              <span>Total:</span>
              <span>$${cart.total.toFixed(2)}</span>
            </div>
            <button class="btn btn-primary w-100">Proceed to Checkout</button>
          </div>
        </div>
      `;
    }
    
    // Add event listeners for quantity controls
    document.querySelectorAll(".decrease-qty").forEach(button => {
      button.addEventListener("click", function() {
        const itemId = parseInt(this.getAttribute("data-id"));
        updateCartItemQuantity(itemId, -1);
      });
    });
    
    document.querySelectorAll(".increase-qty").forEach(button => {
      button.addEventListener("click", function() {
        const itemId = parseInt(this.getAttribute("data-id"));
        updateCartItemQuantity(itemId, 1);
      });
    });
    
    document.querySelectorAll(".remove-item").forEach(button => {
      button.addEventListener("click", function() {
        const itemId = parseInt(this.getAttribute("data-id"));
        removeCartItem(itemId);
        renderCartPage(); // Re-render the cart page
      });
    });
  } catch (error) {
    console.error("Error rendering cart page:", error);
  }
}
// Function to update quantity of cart items
function updateCartItemQuantity(itemId, change) {
  try {
    const cart = JSON.parse(sessionStorage.getItem('cart')) || { items: [], total: 0, count: 0 };
    
    const itemIndex = cart.items.findIndex(item => item.id === itemId);
    
    if (itemIndex !== -1) {
      // Update quantity, ensuring it doesn't go below 1
      cart.items[itemIndex].quantity = Math.max(1, cart.items[itemIndex].quantity + change);
      
      // Update cart totals
      cart.total = calculateCartTotal(cart.items);
      cart.count = calculateCartCount(cart.items);
      
      sessionStorage.setItem('cart', JSON.stringify(cart));
      
      // Re-render cart page if we're on it
      renderCartPage();
      updateCartDisplay();
    }
  } catch (error) {
    console.error("Error updating item quantity:", error);
  }
}

// Add this to your DOMContentLoaded event
document.addEventListener("DOMContentLoaded", function() {
  // ...existing code...
  
  // Initialize cart page if we're on the cart page
  if (document.querySelector(".cart-table")) {
    renderCartPage();
  }
});

// Remove items from cart
function removeCartItem(itemId) {
  try {
    const cart = JSON.parse(sessionStorage.getItem('cart')) || { items: [], total: 0, count: 0 };
    
    const itemIndex = cart.items.findIndex(item => item.id === itemId);
    
    if (itemIndex !== -1) {
      cart.items.splice(itemIndex, 1);
      
      cart.total = calculateCartTotal(cart.items);
      cart.count = calculateCartCount(cart.items);
      
      sessionStorage.setItem('cart', JSON.stringify(cart));
      
      updateCartDisplay();
    }
  } catch (error) {
    console.error("Error removing item from cart:", error);
  }
}


// Product card click handler
function setupProductCardClick() {
  document.querySelectorAll(".product-card img").forEach((img) => {
    img.style.cursor = "pointer";
    img.addEventListener("click", function() {
      const products = JSON.parse(localStorage.getItem('products')) || [];
      const clickedImgSrc = img.getAttribute('src').split('/').pop();

      if (products.length > 0) {
        const matchedProduct = products.find(product => {
          const productImgName = product.img.split('/').pop();
          return productImgName === clickedImgSrc;
        });

        if (matchedProduct) {
          window.location.href = `product.html?id=${matchedProduct.id}`;
        }
      }
    });
  });
}

// Navigation functions
function myfun4() {
  window.location.href = "contacts.html";
}
 
function myfun3() {
  window.location.href = "catalog-Everything.html";
}
/////////////////////////////////////////
