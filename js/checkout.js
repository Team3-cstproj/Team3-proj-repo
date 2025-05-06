
let createdOrderIds = [];

window.addEventListener('DOMContentLoaded', function () {
  const cart = JSON.parse(sessionStorage.getItem('cart')) || { items: [], total: 0, count: 0 };
  const customer = JSON.parse(sessionStorage.getItem('currentUser'));

  if (customer) {
    document.getElementById('name').value = customer.name;
    document.getElementById('email').value = customer.email;
  }

  const orderItems = document.getElementById('orderItems');
  let subtotal = 0;
  orderItems.innerHTML = '';

  cart.items.forEach(item => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;
    const row = document.createElement('tr');
    row.innerHTML = `
                <td>${item.name} × ${item.quantity}</td>
                <td class="text-end">$${itemTotal.toFixed(2)}</td>`;
    orderItems.appendChild(row);
  });

  orderItems.innerHTML += `
            <tr><th>Subtotal</th><td class="text-end">$${subtotal.toFixed(2)}</td></tr>
            <tr><th>Total</th><td class="text-end">$${subtotal.toFixed(2)}</td></tr>`;
});

function validateOrder(event) {
  const form = event.target;
  const phone = document.getElementById('phone');
  const postcode = document.getElementById('postcode');
  const city = document.getElementById('city');
  const formMessage = document.getElementById('form-message');

  let isValid = true;

  // Clear message state
  formMessage.classList.add('d-none');
  formMessage.classList.remove('alert-success', 'alert-danger');
  formMessage.textContent = '';

  // Built-in Bootstrap validation
  if (!form.checkValidity()) {
    isValid = false;
  }

  // Validate phone (10 digits only)
  const phonePattern = /^\d{11}$/;
  if (!phonePattern.test(phone.value.trim())) {
    phone.classList.add('is-invalid');
    phone.nextElementSibling.textContent = 'Phone number must be exactly 11 digits.';
    isValid = false;
  } else {
    phone.classList.remove('is-invalid');
  }

  // Validate postcode (4 to 10 digits)
  const postcodePattern = /^\d{4,10}$/;
  if (!postcodePattern.test(postcode.value.trim())) {
    postcode.classList.add('is-invalid');
    postcode.nextElementSibling.textContent = 'Postcode must be 4 to 10 digits.';
    isValid = false;
  } else {
    postcode.classList.remove('is-invalid');
  }

  // Validate city (letters, spaces, hyphens only)
  const cityPattern = /^[a-zA-Z\s\-]+$/;
  if (!cityPattern.test(city.value.trim())) {
    city.classList.add('is-invalid');
    city.nextElementSibling.textContent = 'City must contain only letters.';
    isValid = false;
  } else {
    city.classList.remove('is-invalid');
  }

  if (!isValid) {
    event.preventDefault();
    event.stopPropagation();
    form.classList.add('was-validated');
    formMessage.classList.remove('d-none');
    formMessage.classList.add('alert', 'alert-danger');
    formMessage.textContent = 'Please correct the errors in the form.';
    return false;
  }

  form.classList.remove('was-validated');
  event.preventDefault(); // prevent actual submission
  placeOrder();
}


function placeOrder() {
  createdOrderIds = [];
  const cart = JSON.parse(sessionStorage.getItem('cart'));
  const products = JSON.parse(localStorage.getItem('products')) || [];
  const customer = JSON.parse(sessionStorage.getItem('currentUser'));
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const orders = JSON.parse(localStorage.getItem('orders')) || [];

  if (!cart || cart.items.length === 0) {
    alert('Cart is empty!');
    return;
  }

  const country = document.getElementById('country').value;
  const city = document.getElementById('city').value;
  const streetAddress = document.getElementById('streetAddress').value;
  const postcode = document.getElementById('postcode').value;
  const phone = document.getElementById('phone').value;
  const state = document.getElementById('state').value;

  const currentDate = new Date().toISOString().slice(0, 10);

  cart.items.forEach(item => {
    const product = products.find(p => p.id === item.id);
    if (!product) return;
    const seller = users.find(u => u.id === product.sellerId);

    const newOrder = {
      id: orders.length + 1,
      userId: customer.id,
      userName: customer.name,
      sellerId: seller?.id || null,
      sellerName: seller?.name || 'Unknown',
      productId: item.id,
      productName: item.name,
      quantity: item.quantity,
      orderDate: currentDate,
      totalPrice: item.price * item.quantity,
      country,
      city,
      state,
      streetAddress,
      postcode,
      phone
    };

    orders.push(newOrder);
    createdOrderIds.push(newOrder.id);

    product.sold += item.quantity;
    product.availible -= item.quantity;
  });

  localStorage.setItem('orders', JSON.stringify(orders));
  localStorage.setItem('products', JSON.stringify(products));
  sessionStorage.removeItem('cart');


  showMessage("✅ Order created! Redirecting to Receipt...", "success");


  setTimeout(() => {

    window.location.href = `receipt.html?ids=${createdOrderIds.join(',')}`;
  }, 1500);

}
const messageBox = document.getElementById("form-message");

function showMessage(text, type = "danger") {
  messageBox.className = `alert alert-${type}`;
  messageBox.textContent = text;
  messageBox.classList.remove("d-none");
}






//nav bar -------start
const cartBtnList = document.querySelectorAll(".cart-trigger");
const cartSidebar = document.getElementById("cartSidebar");
const cartOverlay = document.getElementById("cartOverlay");
const closeCartBtn = document.getElementById("closeCart");

cartBtnList.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    cartSidebar.classList.add("active");
    cartOverlay.classList.add("active");
    updateCartDisplay(); // Update cart display when opening
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
    document.getElementById("continueShopping").addEventListener("click", function (e) {
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