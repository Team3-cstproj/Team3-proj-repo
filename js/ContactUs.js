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

  // Initialize user profile dropdown
  setupUserProfile();
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
      sessionStorage.clear('currentUser');
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

function updateCartDisplay() {
  const cartData = sessionStorage.getItem('cart');
  
  if (!cartData) {
    // Reset cart if not found
    sessionStorage.setItem('cart', JSON.stringify({ items: [], total: 0, count: 0 }));
    return;
  }
  
  const cart = JSON.parse(cartData);
  if (!cart || typeof cart !== 'object') {
    // Reset cart if corrupted
    sessionStorage.setItem('cart', JSON.stringify({ items: [], total: 0, count: 0 }));
    return;
  }
  
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
    
    // Update footer with View Cart button
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
  const cartData = sessionStorage.getItem('cart');
  
  if (!cartData) {
    // Reset cart if not found
    sessionStorage.setItem('cart', JSON.stringify({ items: [], total: 0, count: 0 }));
    return;
  }
  
  const cart = JSON.parse(cartData);
  if (!cart || !Array.isArray(cart.items)) {
    // Reset cart if corrupted
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
  }
}

// Calculate cart total function
function calculateCartTotal(items) {
  return items.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function calculateCartCount(items) {
  return items.reduce((count, item) => count + item.quantity, 0);
}
///////======================================end of cart =======================================================


// Footer function
function myfun() {
  window.location.href = "contacts.html";
}

// Form validation
document.addEventListener('DOMContentLoaded', function() {
  // Get form elements
  const form = document.getElementById('contactForm');
  const formResponse = document.getElementById('formResponse');
  
  if (form) {
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      
      // Check form validity
      if (form.checkValidity() === false) {
        form.classList.add('was-validated');
        return false;
      }
      
      // Form is valid - save the data
      const formData = {
        name: document.getElementById('name').value,
        subject: document.getElementById('subject').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value,
        date: new Date().toISOString().split('T')[0] // YYYY-MM-DD format
      };
      
      // Save to localStorage
      saveContactRequest(formData);
      
      // Show success message
      formResponse.style.display = 'block';
      formResponse.classList.add('alert-success');
      formResponse.classList.remove('alert-danger');
      formResponse.innerHTML = 'Message sent successfully!';
      
      // Reset form
      form.reset();
      form.classList.remove('was-validated');
      
      // Hide message after 3 seconds
      setTimeout(() => {
        formResponse.style.display = 'none';
      }, 3000);
    });
    
    // Additional validation for email format
    const emailInput = document.getElementById('email');
    if (emailInput) {
      emailInput.addEventListener('input', function() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value && !emailRegex.test(emailInput.value)) {
          emailInput.setCustomValidity('Please enter a valid email address');
        } else {
          emailInput.setCustomValidity('');
        }
      });
    }
  }
});
// Save contact request to localStorage
function saveContactRequest(formData) {
  // Get existing data
  const contactData = JSON.parse(localStorage.getItem('contactData')) || { requests: [] };
  
  // Add new request
  contactData.requests.push(formData);
  
  // Save back to localStorage
  localStorage.setItem('contactData', JSON.stringify(contactData));
}