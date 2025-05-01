const sampleProducts = [
  {
    id: 1,
    name: "Basic Gray Jeans",
    category: "Women",
    price: 150.00,
    availible: 10,
    sold: 5,
    img: "img/products/product1.jpg",
    reviews: [{ rating: 4 }]
  },
  {
    id: 2,
    name: "Casual White Shirt",
    category: "Men",
    price: 89.99,
    availible: 15,
    sold: 8,
    img: "img/products/product2.jpg",
    reviews: [{ rating: 5 }]
  },
  {
    id: 3,
    name: "Black Leather Jacket",
    category: "Women",
    price: 199.99,
    availible: 5,
    sold: 3,
    img: "img/products/product3.jpg",
    reviews: [{ rating: 4 }]
  }
  // Add more sample products as needed
];

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', function() {
  initializeCart();
  
  // Check if products exist in localStorage
  if (!localStorage.getItem('products')) {
    localStorage.setItem('products', JSON.stringify(sampleProducts));
  }
  
  // Set up event listeners and initialize components
  setupCartButtons();
  setupUserProfile();
  
  // If we're on a page with product listings, initialize them
  if (document.getElementById('product-list')) {
    initializeProductDisplay();
  }
  
  // Set up the logo carousel if it exists
  if (document.getElementById('logoTrack')) {
    setupLogoCarousel();
  }
  
  // Always update cart display, this works across all pages
  updateCartDisplay();
});

// Cart initialization function - called early
function initializeCart() {
  if (!sessionStorage.getItem('cart')) {
    sessionStorage.setItem('cart', JSON.stringify({
      items: [],
      total: 0,
      count: 0
    }));
  }
  // Update cart counter in navbar
  updateCartDisplay();
}

// Get all products from localStorage
function getAllProducts() {
  const products = localStorage.getItem('products');
  return products ? JSON.parse(products) : [];
}

// Initialize product display
function initializeProductDisplay() {
  const products = getAllProducts();
  
  // Display products
  displayProducts(products);
}

// Display products (limited to 10)
function displayProducts(products) {
  const productContainer = document.getElementById("product-list");
  if (!productContainer) return;
  
  productContainer.innerHTML = '';

  // Limit to 10 products
  const productsToShow = products.slice(0, 10);

  productsToShow.forEach(product => {
    if (!product.reviews || product.reviews.length === 0) {
      product.reviews = [{ rating: 0 }];
    }

    const ratings = product.reviews.map(r => r.rating);
    const avgRating = ratings.length ? ratings.reduce((a, b) => a + b) / ratings.length : 0;

    // Generate star HTML
    let starHtml = '';
    for (let i = 1; i <= 5; i++) {
      starHtml += `<i class="${i <= Math.round(avgRating) ? 'fas' : 'far'} fa-star"></i>`;
    }

    const cart = JSON.parse(sessionStorage.getItem("cart")) || {
      items: [],
      total: 0,
      count: 0,
    };
    const existingItem = cart.items.find(item => item.id === product.id);
    let available = product.availible;
    if (existingItem) {
      available -= existingItem.quantity;
    }

    let stockInfoHtml = '';
    let hoverCartButtonHtml = '';

    if (available > 0) {
      stockInfoHtml = `<p class="text-success small">Available: ${available}</p>`;
      hoverCartButtonHtml = `
        <div class="hover-icons">
          <a href="#" class="icon-btn cart-button" data-id="${product.id}">
              <i class="fas fa-shopping-cart"></i>
              <span class="tooltip-text">Add to cart</span>
          </a>
        </div>
      `;
    } else {
      stockInfoHtml = `<p class="text-danger small fw-bold">Out of Stock</p>`;
      hoverCartButtonHtml = '';
    }

    const productCard = `
      <div class="col">
        <div class="card product-card">
          <a href="product.html?id=${product.id}" class="text-decoration-none text-dark">
            <img src="${product.img}" class="card-img-top" alt="${product.name}">
          </a>
          ${hoverCartButtonHtml}
          <div class="card-body">
            <a href="product.html?id=${product.id}" class="text-decoration-none text-dark">
              <h5 class="card-title">${product.name}</h5>
            </a>
            <p class="text-muted small">${product.category}</p>
            <div class="star-rating">
              ${starHtml}
            </div>
            <p class="card-text">$${product.price.toFixed(2)}</p>
            ${stockInfoHtml}
          </div>
        </div>
      </div>
    `;

    productContainer.innerHTML += productCard;
  });

  setupCartButtons();
}

// Set up cart button event listeners
function setupCartButtons() {
  document.querySelectorAll('.cart-button').forEach(button => {
    button.replaceWith(button.cloneNode(true));
  });
  
  // Add fresh event listeners
  document.querySelectorAll('.cart-button').forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const productId = parseInt(this.getAttribute('data-id'));
      const product = getAllProducts().find(p => p.id === productId);
      
      if (product) {
        addToCart(product, 1);
        updateCartDisplay();

        this.classList.add('disabled');

        const tooltip = this.querySelector('.tooltip-text');
        const buttonEl = this;

        if (tooltip) {
          const originalText = tooltip.textContent;

          buttonEl.classList.add('success-feedback');
          tooltip.textContent = 'Successfully added to cart';

          setTimeout(() => {
            buttonEl.classList.add('fade-out');
            tooltip.textContent = originalText;

            // Remove success class and fade-out class, and update the page
            setTimeout(() => {
              buttonEl.classList.remove('success-feedback', 'fade-out');
              buttonEl.classList.remove('disabled');
              if (document.getElementById('product-list')) {
                displayProducts(getAllProducts());
              }
            }, 500); 
          }, 1500);
        }
      }
    });
  });
  
  setupCartSidebar();
}

// Add item to cart
function addToCart(product, quantity) {
  const cartData = sessionStorage.getItem('cart');
  
  if (!cartData) {
    sessionStorage.setItem('cart', JSON.stringify({ 
      items: [{
        id: product.id,
        name: product.name,
        price: product.price,
        img: product.img,
        quantity: quantity
      }],
      total: product.price * quantity,
      count: quantity
    }));
    return;
  }
  
  const cart = JSON.parse(cartData);
  if (!cart || !Array.isArray(cart.items)) {
    // Reset cart if corrupted
    sessionStorage.setItem('cart', JSON.stringify({ 
      items: [{
        id: product.id,
        name: product.name,
        price: product.price,
        img: product.img,
        quantity: quantity
      }],
      total: product.price * quantity,
      count: quantity
    }));
    return;
  }
  
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
  
  // Save to sessionStorage
  sessionStorage.setItem('cart', JSON.stringify(cart));
}

// Update cart display throughout the site
function updateCartDisplay() {
  const cartData = sessionStorage.getItem('cart');
  
  if (!cartData) {
    sessionStorage.setItem('cart', JSON.stringify({ items: [], total: 0, count: 0 }));
    return;
  }
  
  const cart = JSON.parse(cartData);
  if (!cart || typeof cart !== 'object') {
    sessionStorage.setItem('cart', JSON.stringify({ items: [], total: 0, count: 0 }));
    return;
  }
  
  // Update cart count in navbar - all triggers
  document.querySelectorAll(".cart-trigger").forEach(cartTrigger => {
    if (cartTrigger) {
      cartTrigger.innerHTML = `
        <i class="fa-sharp fa-solid fa-bag-shopping"></i>
        <sup class="bg-light rounded-circle">
          <span class="text-dark">${cart.count}</span>
        </sup>
        <span class="cart-total ms-1">${cart.total.toFixed(2)}</span>
      `;
    }
  });
  
  // Update cart sidebar content if it exists
  const cartContent = document.querySelector(".cart-content");
  const cartFooter = document.querySelector(".cart-footer");
  if (cartContent && cartFooter) {
    updateCartSidebar(cart, cartContent, cartFooter);
  }
}

// Setup cart sidebar triggers and events
function setupCartSidebar() {
  const cartBtnList = document.querySelectorAll(".cart-trigger");
  const cartSidebar = document.getElementById("cartSidebar");
  const cartOverlay = document.getElementById("cartOverlay");
  const closeCartBtn = document.getElementById("closeCart");
  
  if (!cartBtnList.length || !cartSidebar || !cartOverlay) return;
  
  // Remove existing event listeners by cloning nodes
  cartBtnList.forEach(btn => {
    btn.replaceWith(btn.cloneNode(true));
  });
  
  // Add fresh event listeners to cart icons
  document.querySelectorAll(".cart-trigger").forEach(btn => {
    btn.addEventListener("click", function(e) {
      e.preventDefault();
      cartSidebar.classList.add("active");
      cartOverlay.classList.add("active");
      updateCartDisplay(); // Update cart display when opening
    });
  });
  
  // Close button event listener
  if (closeCartBtn) {
    closeCartBtn.addEventListener("click", function() {
      cartSidebar.classList.remove("active");
      cartOverlay.classList.remove("active");
    });
  }
  
  cartOverlay.addEventListener("click", function() {
    cartSidebar.classList.remove("active");
    cartOverlay.classList.remove("active");
  });
}

// Update cart sidebar contents
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
                <small class="text-muted">${item.price.toFixed(2)} × ${item.quantity}</small>
              </div>
            </div>
            <div class="d-flex align-items-center">
              <span class="fw-bold me-2">${(item.price * item.quantity).toFixed(2)}</span>
              <button class="btn btn-sm btn-outline-danger remove-item" data-id="${item.id}">
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>
        `).join('')}
      </div>
      <hr>
      <div class="d-flex justify-content-between fw-bold">
        <span>Total:</span>
        <span>${cart.total.toFixed(2)}</span>
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

// Remove item from cart
function removeCartItem(itemId) {
  const cartData = sessionStorage.getItem('cart');
  
  if (!cartData) {
    // Reset cart if not found
    sessionStorage.setItem('cart', JSON.stringify({ items: [], total: 0, count: 0 }));
    return;
  }
  
  const cart = JSON.parse(cartData);
  if (!cart || !Array.isArray(cart.items)) {
    sessionStorage.setItem('cart', JSON.stringify({ items: [], total: 0, count: 0 }));
    return;
  }
  
  // Find item index
  const itemIndex = cart.items.findIndex(item => item.id === itemId);
  
  if (itemIndex !== -1) {
    // Remove the item
    cart.items.splice(itemIndex, 1);
    
    // Recalculate totals
    cart.total = calculateCartTotal(cart.items);
    cart.count = calculateCartCount(cart.items);
    
    // Save updated cart
    sessionStorage.setItem('cart', JSON.stringify(cart));
    
    // Update display
    updateCartDisplay();
    

    if (document.getElementById('product-list')) {
      displayProducts(getAllProducts());
    }
  }
}

// Calculate cart total function
function calculateCartTotal(items) {
  return items.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Calculate cart count function
function calculateCartCount(items) {
  return items.reduce((count, item) => count + item.quantity, 0);
}

// User profile dropdown setup
function setupUserProfile() {
  const userIcon = document.querySelector(".nav-link[href='login.html']");
  if (!userIcon) return;
  
  const userData = JSON.parse(sessionStorage.getItem("currentUser"));
  
  // Remove existing dropdown if it exists
  const existingDropdown = userIcon.parentNode.querySelector('.profile-dropdown');
  if (existingDropdown) {
    existingDropdown.remove();
  }

  // Create user profile dropdown container
  const profileDropdown = document.createElement("div");
  profileDropdown.className = "profile-dropdown";
  profileDropdown.style.display = "none";
  profileDropdown.style.position = "absolute";
  profileDropdown.style.right = "0";
  profileDropdown.style.top = "100%";
  profileDropdown.style.backgroundColor = "white";
  profileDropdown.style.border = "1px solid #ddd";
  profileDropdown.style.borderRadius = "4px";
  profileDropdown.style.padding = "10px";
  profileDropdown.style.zIndex = "1000";
  profileDropdown.style.minWidth = "200px";
  profileDropdown.style.boxShadow = "0 2px 5px rgba(0,0,0,0.1)";

  if (userData) {
    // User is logged in, show profile info and logout option
    profileDropdown.innerHTML = `
      <div class="user-info mb-2">
        <p class="mb-1"><strong>${userData.name || "User"}</strong></p>
        <p class="small text-muted mb-2">${userData.email || ""}</p>
        <p class="small">Role: ${userData.role || "user"}</p>
      </div>
      <button id="editbtn" class="btn btn-sm btn-secondary w-100 mb-1">Edit Info</button>
      <button id="logoutBtn" class="btn btn-sm btn-danger w-100">Logout</button>
    `;


    userIcon.innerHTML = '<i class="fa-solid fa-user-check"></i>';
    userIcon.href = "#"; // Prevent navigation to login page
  
    profileDropdown
      .querySelector("#editbtn")
      .addEventListener("click", () => {
        window.location.href = "updateAccount.html";
      });
  } else {
    profileDropdown.innerHTML = `
      <p class="mb-2">You are not logged in</p>
      <a href="login.html" class="btn btn-sm btn-primary w-100">Login</a>
    `;
  }

  // Add dropdown to DOM
  userIcon.parentNode.appendChild(profileDropdown);

  // Toggle dropdown on click
  userIcon.addEventListener("click", (e) => {
    e.preventDefault();
    const isVisible = profileDropdown.style.display === "block";
    profileDropdown.style.display = isVisible ? "none" : "block";
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", (e) => {
    if (!userIcon.contains(e.target) && !profileDropdown.contains(e.target)) {
      profileDropdown.style.display = "none";
    }
  });
  
  // Add logout functionality
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      sessionStorage.clear();
      window.location.href = "login.html";
    });
  }
}
///////========================================================================================================///
function myfun3() {
  window.location.href = "catalog-Everything.html";
}

///////======================================================================================/////
/////// ============ LOGO CAROUSEL ============/////

  function setupLogoCarousel() {
    const logoTrack = document.getElementById('logoTrack');
    const leftArrow = document.querySelector('.carousel-arrow.left');
    const rightArrow = document.querySelector('.carousel-arrow.right');
    let logoItems = document.querySelectorAll('.logo-item');
    let currentIndex = 0;
    let autoRotateInterval;

    function cloneItemsForInfinite() {
      const clones = Array.from(logoItems).slice(0, 4);
      clones.forEach(item => {
        const clone = item.cloneNode(true);
        logoTrack.appendChild(clone);
      });
      logoItems = document.querySelectorAll('.logo-item');
    }

    function updateCarousel() {
      const logoWidth = logoItems[0]?.offsetWidth || 0;
      logoTrack.style.transform = `translateX(-${currentIndex * logoWidth}px)`;

      if (currentIndex >= logoItems.length - 4) {
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

    function moveNext() {
      currentIndex++;
      updateCarousel();
      resetAutoRotate();
    }

    function movePrev() {
      if (currentIndex <= 0) {
        logoTrack.style.transition = 'none';
        currentIndex = logoItems.length - 4;
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

    function startAutoRotate() {
      autoRotateInterval = setInterval(moveNext, 2000);
    }

    function resetAutoRotate() {
      clearInterval(autoRotateInterval);
      startAutoRotate();
    }

    if (logoTrack && logoItems.length > 0) {
      cloneItemsForInfinite();
      startAutoRotate();
      leftArrow?.addEventListener('click', movePrev);
      rightArrow?.addEventListener('click', moveNext);
      window.addEventListener('resize', updateCarousel);
      logoTrack.addEventListener('mouseenter', () => clearInterval(autoRotateInterval));
      logoTrack.addEventListener('mouseleave', startAutoRotate);
    }
  }

  document.addEventListener('DOMContentLoaded', setupLogoCarousel);





