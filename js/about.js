
///////////////////////========================================================////////////////////========/////
//nav bar -----start
//  cart list baby
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

  ////btns color baby
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

  // Initialize user profile dropdown
  setupUserProfile();
  
  // Load product details if on product page
  loadProductDetails();
});

// Cart initialization function - called early
function initializeCart() {
  if (!localStorage.getItem('cart')) {
    localStorage.setItem('cart', JSON.stringify({
      items: [],
      total: 0,
      count: 0
    }));
  }
  // Update cart counter in navbar
  updateCartDisplay();
}

// Enhanced login/logout functionality
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
    // if User login show profile info and logout option
    profileDropdown.innerHTML = `
      <div class="user-info mb-2">
        <p class="mb-1"><strong>${userData.name || 'User'}</strong></p>
        <p class="small text-muted mb-2">${userData.email || ''}</p>
        <p class="small">Role: ${userData.role || 'user'}</p>
      </div>
      <button id="logoutBtn" class="btn btn-sm btn-danger w-100">Logout</button>
    `;
    
    // Change icon to logged in state
    userIcon.innerHTML = '<i class="fa-solid fa-user-check"></i>';
    userIcon.href = '#'; // Prevent navigation to login page
    
    // Add click for logout - fixed sessionStorage key
    profileDropdown.querySelector('#logoutBtn').addEventListener('click', () => {
      sessionStorage.removeItem('currentUser'); // Fixed from 'user' to 'currentUser'
      window.location.href = 'login.html';
    });
  } else {
    // User is not login show login 
    profileDropdown.innerHTML = `
      <p class="mb-2">You are not logged in</p>
      <a href="login.html" class="btn btn-sm btn-primary w-100">Login</a>
    `;
  }
  
  // Add dropdown to DOM
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

///////////////////////////////
// Product Details and Cart Functionality
/////////////////////////////
function loadProductDetails() {
  // Check if we're on a product page
  const productImageContainer = document.querySelector(".product-image");
  if (!productImageContainer) return; // Not on product page
  
  try {
    // Get all products from localStorage
    const products = JSON.parse(localStorage.getItem('products')) || [];
    
    if (products.length === 0) {
      console.error("No products found in localStorage");
      return;
    }
    
    // Get product ID from URL or use first product as default
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    
    let product;
    if (productId) {
      product = products.find(p => p.id === productId);
    }
    
    if (!product) {
      product = products[0]; // Access first product if no match or no ID
      console.log("Using default product:", product.name);
    }
    
    // If product found, display its details
    if (product) {
      displayProductDetails(product);
      setupAddToCart(product);
      displayRelatedProducts(product);
    } else {
      console.error("Product not found");
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
        link.href = `catalog-${product.category}.html`; // Update href based on category
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
  // Update the additional information part
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


////////////
/////Add to cart///////////////
/////////////////////////////


function setupAddToCart(product) {
  const addToCartBtn = document.querySelector(".add-to-cart-btn");
  if (addToCartBtn) {
    addToCartBtn.addEventListener("click", function() {
      const quantityInput = document.getElementById("quantity");
      const quantity = parseInt(quantityInput ? quantityInput.value : 1) || 1;
      
      addToCart(product, quantity);
      
      // Show confirmation message
      showAddToCartConfirmation(product.name, quantity);
      
      // update the cart display which will show the changes
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
  
  // Add to container
  toastContainer.appendChild(toast);
  
  // Close button functionality
  toast.querySelector('.btn-close').addEventListener('click', function() {
    toastContainer.removeChild(toast);
  });
  
  // Auto-remove after 3 seconds
  setTimeout(() => {
    if (toast.parentNode === toastContainer) {
      toastContainer.removeChild(toast);
    }
  }, 3000);
}

function addToCart(product, quantity) {
  try {
    const cart = JSON.parse(localStorage.getItem('cart')) || { items: [], total: 0, count: 0 };
    
    // Check if product already in cart
    const existingItem = cart.items.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
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
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    console.log("Cart updated:", cart);
  } catch (error) {
    console.error("Error adding to cart:", error);
  }
}

// Helper functions to recalculate cart totals (prevents accumulation errors)
function calculateCartTotal(items) {
  return items.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function calculateCartCount(items) {
  return items.reduce((count, item) => count + item.quantity, 0);
}

function updateCartDisplay() {
  try {
    const cart = JSON.parse(localStorage.getItem('cart')) || { items: [], total: 0, count: 0 };
    
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
    localStorage.setItem('cart', JSON.stringify({ items: [], total: 0, count: 0 }));
  }
}

function updateCartSidebar(cart, cartContent, cartFooter) {
  const cartSidebar = document.getElementById("cartSidebar");
  const cartOverlay = document.getElementById("cartOverlay");
  
  if (cart.items.length === 0) {
    cartContent.innerHTML = "<p>Your cart is empty.</p>";
    cartFooter.innerHTML = `
      <a href="#" class="continue-shopping bg-primary" id="continueShopping">Continue Shopping</a>
    `;
    
    // Add event listener to continue shopping button
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
    
    // Update footer with View Cart and Checkout buttons
    cartFooter.innerHTML = `
      <div class="d-flex flex-column gap-2">
        <a href="cart.html" class="btn btn-primary">View Cart</a>
      </div>
    `;
    
    // Add event listeners to remove buttons
    document.querySelectorAll(".remove-item").forEach(button => {
      button.addEventListener("click", function() {
        const itemId = parseInt(this.getAttribute("data-id"));
        removeCartItem(itemId);
      });
    });
  }
}

// Add function to remove items from cart
function removeCartItem(itemId) {
  try {
    const cart = JSON.parse(localStorage.getItem('cart')) || { items: [], total: 0, count: 0 };
    
    // Find item index
    const itemIndex = cart.items.findIndex(item => item.id === itemId);
    
    if (itemIndex !== -1) {
      // Remove the item
      cart.items.splice(itemIndex, 1);
      
      // Recalculate totals
      cart.total = calculateCartTotal(cart.items);
      cart.count = calculateCartCount(cart.items);
      
      // Save updated cart
      localStorage.setItem('cart', JSON.stringify(cart));
      
      // Update display
      updateCartDisplay();
    }
  } catch (error) {
    console.error("Error removing item from cart:", error);
  }
}

// Added missing function for displaying related products
function displayRelatedProducts(product) {
  const relatedProductsContainer = document.querySelector(".related-products");
  if (!relatedProductsContainer) return;
  
  try {
    // Get all products
    const products = JSON.parse(localStorage.getItem('products')) || [];
    
    // Filter related products (same category but not the current product)
    const relatedProducts = products
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 4); // Limit to 4 products
    
    if (relatedProducts.length === 0) {
      relatedProductsContainer.style.display = 'none';
      return;
    }
    
    // Get the container for the product cards
    const productsRow = relatedProductsContainer.querySelector(".row") || relatedProductsContainer;
    
    productsRow.innerHTML = relatedProducts.map(product => `
      <div class="col-md-3 col-sm-6 mb-4">
        <div class="card product-card h-100">
          <a href="product-details.html?id=${product.id}" class="text-decoration-none">
            <img src="${product.img}" class="card-img-top" alt="${product.name}">
            <div class="card-body">
              <h5 class="card-title">${product.name}</h5>
              <p class="card-text fw-bold">$${product.price.toFixed(2)}</p>
            </div>
          </a>
          <div class="card-footer bg-transparent border-0">
            <button class="btn btn-primary w-100 quick-add-btn" data-id="${product.id}">Add to Cart</button>
          </div>
        </div>
      </div>
    `).join('');
    
    // Add event listeners to the quick add buttons
    productsRow.querySelectorAll(".quick-add-btn").forEach(button => {
      button.addEventListener("click", function() {
        const productId = parseInt(this.getAttribute("data-id"));
        const selectedProduct = products.find(p => p.id === productId);
        
        if (selectedProduct) {
          addToCart(selectedProduct, 1);
          showAddToCartConfirmation(selectedProduct.name, 1);
          updateCartDisplay();
        }
      });
    });
  } catch (error) {
    console.error("Error displaying related products:", error);
  }
}
////////////End of cart functionality////////////////