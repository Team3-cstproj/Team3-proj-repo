let cartData = JSON.parse(sessionStorage.getItem('cart')) || { count: 0, items: [], total: 0 };
const cartTableBody = document.querySelector('.cart_table tbody');
const cartTotals = document.querySelector('.cart-totals');

// Render cart items
function renderCart() {
    cartTableBody.innerHTML = '';
    products = JSON.parse(localStorage.getItem('products')) || [];

    cartData.items.forEach((item, index) => {
        const row = document.createElement('tr');
        row.setAttribute('data-index', index);
        
        const product = products.find(product => product.id === item.id);
         

        row.innerHTML = `
      <td>
        <div class="remove-icon">
          <i class="fa-solid fa-xmark"></i>
        </div>
      </td>
      <td>
        <img src="${item.img}" alt="Product Image" width="50">
      </td>
      <td>${item.name}</td>
      <td class="price" data-price="${item.price}">$${item.price}</td>
      <td>
        <input type="number" class="quantity-input" value="${item.quantity}" min="1"  max="${product.availible}" data-price="${item.price}">
      </td>
      <td class="subtotal">$${item.price * item.quantity}</td>
    `;


        cartTableBody.appendChild(row);
        const alertRow = document.createElement('tr');
        alertRow.classList.add('cart-alert-row');
        alertRow.innerHTML = `<td colspan="6"><div class="alert alert-danger d-none" role="alert"></div></td>`;
        cartTableBody.appendChild(alertRow);

    });

    updateCartTotal();
}

// Update cart total price and subtotal fields
function updateCartTotal() {
    let subtotal = 0;

    cartData.items.forEach(item => {
        subtotal += item.price * item.quantity;
    });

    cartData.total = subtotal;

    // Update Cart Totals Section
    const cartTotalsBody = cartTotals.querySelector('tbody');
    cartTotalsBody.innerHTML = `
    <tr><td>Subtotal: $${subtotal}</td></tr>
    <tr><td>Total: $${subtotal}</td></tr>

  `;

    saveCart();
}

// Save updated cart data into sessionStorage
function saveCart() {
    // Update the count based on total quantities
    cartData.count = cartData.items.reduce((acc, item) => acc + item.quantity, 0);
    sessionStorage.setItem('cart', JSON.stringify(cartData));
}

// Remove item from cart
function removeItem(index) {
    cartData.items.splice(index, 1);
    saveCart();
    renderCart();
}

// Handle events (remove or update quantity)
cartTableBody.addEventListener('click', function (e) {
    if (e.target.classList.contains('fa-xmark')) {
        const index = +e.target.closest('tr').getAttribute('data-index');
        removeItem(index);
    }
});
function showCartAlert(index, message) {
    const allAlertRows = document.querySelectorAll('.cart-alert-row');
    const alertBox = allAlertRows[index].querySelector('.alert');
    
    alertBox.textContent = message;
    alertBox.classList.remove('d-none');

    // Auto-hide after 3 seconds
    setTimeout(() => {
        alertBox.classList.add('d-none');
    }, 3000);
}


cartTableBody.addEventListener('change', function (e) {
  if (e.target.classList.contains('quantity-input')) {
      const quantity = +e.target.value;
      const index = +e.target.closest('tr').getAttribute('data-index');
      const max = +e.target.getAttribute('max');

      if (quantity < 1 || quantity > max) {
          showCartAlert(index, `Please enter a quantity between 1 and ${max}.`);
          e.target.value = cartData.items[index].quantity;
          return;
      }

      cartData.items[index].quantity = quantity;
      updateCartTotal();
      renderCart();
      updateCartDisplay();
  }
});



// Initial render
renderCart();

const checkoutButton = document.querySelector('.checkout-btn');
checkoutButton.addEventListener('click', function () {
  const currentUser = sessionStorage.getItem('currentUser');

  if (currentUser) {
    window.location.href = 'checkout.html';
  } else {
    window.location.href = 'login.html';
  }
});




//nav bar -----start
const cartBtnList = document.querySelectorAll(".cart-trigger");
const cartSidebar = document.getElementById("cartSidebar");
const cartOverlay = document.getElementById("cartOverlay");
const closeCartBtn = document.getElementById("closeCart");

cartBtnList.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    cartSidebar.classList.add("active");
    cartOverlay.classList.add("active");
    updateCartDisplay(); 
  });
});

closeCartBtn.addEventListener("click", () => {
  cartSidebar.classList.remove("active");
  cartOverlay.classList.remove("active");
});

cartOverlay.addEventListener("click", () => {
  cartSidebar.classList.remove("active");
  cartOverlay.classList.remove("active");
});

////btns color baby
document.addEventListener("DOMContentLoaded", function () {
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
});

// Enhanced login/logout functionality
function setupUserProfile() {
  const userIcon = document.querySelector(".nav-link[href='login.html']");
  const userData = JSON.parse(sessionStorage.getItem("currentUser"));

  if (!userIcon) return;

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
    // if  User login show profile info and logout option
    profileDropdown.innerHTML = `
      <div class="user-info mb-2">
        <p class="mb-1"><strong>${userData.name || "User"}</strong></p>
        <p class="small text-muted mb-2">${userData.email || ""}</p>
        <p class="small">Role: ${userData.role || "user"}</p>
      </div>
      <button id="editbtn" class="btn btn-sm btn-secondary w-100 mb-1">Edit Info</button>
      <button id="logoutBtn" class="btn btn-sm btn-danger w-100">Logout</button>
    `;

    // Change icon to  logged in state
    userIcon.innerHTML = '<i class="fa-solid fa-user-check"></i>';
    userIcon.href = "#"; // Prevent navigation to login page

    // Add click  for Edit Info
    profileDropdown
      .querySelector("#editbtn")
      .addEventListener("click", () => {
        window.location.href = "updateAccount.html";
      });
    // Add click  for logout
    profileDropdown
      .querySelector("#logoutBtn")
      .addEventListener("click", () => {
        sessionStorage.clear();
        window.location.href = "login.html";
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
}

// Call setup function when DOM is loaded
document.addEventListener("DOMContentLoaded", setupUserProfile);
// nav bar -------end


function updateCartDisplay() {
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
  
  // Update cart sidebar content
  updateCartSidebar(cart);
}

function updateCartSidebar(cart) {
  const cartContent = document.querySelector(".cart-content");
  const cartFooter = document.querySelector(".cart-footer");
  
  if (cart.items.length === 0) {
    cartContent.innerHTML = "<p>Your cart is empty.</p>";
    cartFooter.innerHTML = `
      <a href="#" class="continue-shopping bg-primary" id="continueShopping">Continue Shopping</a>
    `;
    
    // Add event listener to continue shopping button
    document.getElementById("continueShopping").addEventListener("click", function(e) {
      e.preventDefault();
      cartSidebar.classList.remove("active");
      cartOverlay.classList.remove("active");
    });
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
            <div>
              <span class="fw-bold">$${(item.price * item.quantity).toFixed(2)}</span>
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
  }
}
window.addEventListener('load', updateCartDisplay);

// nav bar -------end