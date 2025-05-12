function getAllProducts() {
    const products = localStorage.getItem('products');
    return products ? JSON.parse(products) : [];
}
let allProducts = getAllProducts(); // Fetch products from localStorage or use a sample array
function filterProductsByCategory(category) {
    return allProducts.filter(product => product.category === category);
}
let products = filterProductsByCategory("men"); // Filter products by category

let fullProducts = filterProductsByCategory("men");;
let top5Products = filterProductsByCategory("men").sort((a, b) => b.sold - a.sold).slice(0, 5);
let top5ProductsContainer = document.getElementById("best-sellers-list");
top5ProductsContainer.innerHTML = ''; // Clear existing content
top5Products.forEach(product => {
    if (!product.reviews || product.reviews.length == 0) { 
        product.reviews = [{ rating: 0 }];
      }
    const ratings = product.reviews.map(r => r.rating);
    const avgRating = ratings.length ? ratings.reduce((a, b) => a + b) / ratings.length : 0;

    // Generate star HTML
    let starHtml = '';
    for (let i = 1; i <= 5; i++) {
        starHtml += `<i class="${i <= Math.round(avgRating) ? 'fas' : 'far'} fa-star"></i>`;
    }

    const bestSellerProductCard = `
    <li class="list-group-item bg-light">
              <div class="row g-2 align-items-center">
                  <div class="col-4 col-md-3">
                      <img src="${product.img}" alt="${product.name}" class="img-fluid rounded">
                  </div>
                  <div class="col-8 col-md-9">
                      <div class="card-body p-2">
                          <a href="product.html?id=${product.id}" class="text-decoration-none text-dark">
                          <h6 class="card-title mb-1">${product.name}</h6>
                          </a>
                          <div class="star-rating small mb-1">
                            ${starHtml}
                          </div>
                          <p class="card-text mb-0">$${product.price}</p>
                      </div>
                  </div>
              </div>
          </li>
      `;
    top5ProductsContainer.innerHTML += bestSellerProductCard;
});

function applySorting(products) {
    const sortValue = document.getElementById("sortSelect").value;

    if (sortValue === "priceLowToHigh") {
        products.sort((a, b) => a.price - b.price);
    } else if (sortValue === "priceHighToLow") {
        products.sort((a, b) => b.price - a.price);
    } else if (sortValue === "popularity") {
        products.sort((a, b) => b.sold - a.sold); // Sort by sold quantity
    }
    else if (sortValue === "default") {
        if (products.length == filterProductsByCategory("men").length) {
            products = filterProductsByCategory("men");
        }
    }

    return products;
}

document.getElementById("sortSelect").addEventListener("change", function () {
    products = applySorting(products);
    displayProducts();
});



let productsPerPage = 12;
let currentPage = 1;

window.addEventListener('load', updateCartDisplay);
document.getElementById("clearFilterBtn").addEventListener("click", clearFilters);


function displayProducts() {
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = currentPage * productsPerPage;
  const productsToDisplay = products.slice(startIndex, endIndex);

  const productContainer = document.getElementById("product-list");
  productContainer.innerHTML = '';

  productsToDisplay.forEach(product => {
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

    // === Check available and build buttons/stock info ===
    let stockInfoHtml = '';
    let cartButtonHtml = '';
    let hoverCartButtonHtml = '';

    if (available > 0) {
      stockInfoHtml = `<p class="text-success small">Available: ${available}</p>`;
      cartButtonHtml = `
        <a href="#" class="icon-btn cart-button" data-id="${product.id}">
          <i class="fas fa-shopping-cart"></i>
          <span class="tooltip-text">Add to cart</span>
        </a>
      `;
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
      // No cart buttons if out of stock
    }

    const productCard = `
      <div class="col">
        <a href="product.html?id=${product.id}" class="text-decoration-none text-dark">
          <div class="card product-card">
            <img src="${product.img}" class="card-img-top" alt="${product.name}">
            ${hoverCartButtonHtml}
            <div class="card-body">
              <a href="product.html?id=${product.id}" class="text-decoration-none text-dark">
                <h5 class="card-title">${product.name}</h5>
              </a>
              <p class="text-muted small">${product.category}</p>
              <div class="star-rating">
                ${starHtml}
              </div>
              <p class="card-text">$${product.price}</p>
              ${stockInfoHtml}
            </div>
          </div>
        </a>
      </div>
    `;

    productContainer.innerHTML += productCard;
  });


  document.querySelectorAll('.cart-button').forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault(); // prevent link jump
      const productId = this.getAttribute('data-id');
      const product = products.find(p => p.id == productId);
      
      if (product) {
        addToCart(product, 1);
        updateCartDisplay();

        // Disable the button while animation is running
        this.classList.add('disabled');

        // Apply success animation
        const tooltip = this.querySelector('.tooltip-text');
        const buttonEl = this;

        if (tooltip) {
          const originalText = tooltip.textContent;

          // Add success class for animation
          buttonEl.classList.add('success-feedback');
          tooltip.textContent = 'Successfully added to cart';

          // After 1.5 seconds, trigger fade-out and revert the tooltip text
          setTimeout(() => {
            buttonEl.classList.add('fade-out');
            tooltip.textContent = originalText;

            // Remove success class and fade-out class, and update the page
            setTimeout(() => {
              buttonEl.classList.remove('success-feedback', 'fade-out');
              // Re-enable the button after animation ends
              buttonEl.classList.remove('disabled');
              displayProducts(); // Re-render products after animation
            }, 500); // Duration of fade-out
          }, 1500);
        } else {
          displayProducts(); // fallback if tooltip not found
        }
      }
    });
  });



  updatePagination();
}
function addToCart(product, quantity) {
    const cart = JSON.parse(sessionStorage.getItem('cart')) || { items: [], total: 0, count: 0 };

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
    cart.total += product.price * quantity;
    cart.count += quantity;

    // Save to sessionStorage
    sessionStorage.setItem('cart', JSON.stringify(cart));
}


function updatePagination() {
    const totalPages = Math.ceil(products.length / productsPerPage);
    const paginationContainer = document.querySelector('.pagination');

    let paginationHTML = `
    <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
        <a class="page-link" href="#" onclick="changePage(${currentPage - 1})" tabindex="-1">Previous</a>
    </li>
    `;

    for (let i = 1; i <= totalPages; i++) {
        paginationHTML += `
        <li class="page-item ${currentPage === i ? 'active' : ''}">
            <a class="page-link" href="#" onclick="changePage(${i})">${i}</a>
        </li>
        `;
    }

    paginationHTML += `
    <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
        <a class="page-link" href="#" onclick="changePage(${currentPage + 1})">Next</a>
    </li>
    `;

    paginationContainer.innerHTML = paginationHTML;
}

function changePage(page) {
    const totalPages = Math.ceil(products.length / productsPerPage);
    if (page < 1 || page > totalPages) return;  // Prevent invalid page numbers
    currentPage = page;
    displayProducts();
}

// Initialize the display of products and pagination
displayProducts();
window.addEventListener('load', displayProducts);

let searchTerm = "";
document.getElementById("searchBtn").addEventListener("click", searchByWord);
document.getElementById("filterPriceBtn").addEventListener("click", filterByPrice);

// Handle search by word
function searchByWord() {
  searchTerm = document.getElementById("searchInput").value.trim().toLowerCase();
  let minPrice = parseFloat(document.getElementById("minPrice").value) || 0;
  let maxPrice = parseFloat(document.getElementById("maxPrice").value) || Infinity;

  if (minPrice < 0 || maxPrice < 0) {
    showFilterModal("Price cannot be negative. Please enter values greater than or equal to 0.");
    return;
  }
  if (minPrice > maxPrice) {
    showFilterModal("Minimum price cannot be greater than maximum price.");
    return;
  }

  products = filterProductsByCategory("men");

  if (searchTerm !== "") {
    products = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm) &&
      product.price >= minPrice &&
      product.price <= maxPrice
    );
  } else {
    products = products.filter(product =>
      product.price >= minPrice &&
      product.price <= maxPrice
    );
  }

  if (products.length === 0) {
    showNoProductsFound();
    return;
  }

  currentPage = 1; // Reset to first page after filtering

  products = applySorting(products);
  currentPage = 1; // Reset to first page after filtering

  displayProducts();
}

// Handle price filtering
function filterByPrice() {
  let minPrice = parseFloat(document.getElementById("minPrice").value) || 0;
  let maxPrice = parseFloat(document.getElementById("maxPrice").value) || Infinity;

  if (minPrice < 0 || maxPrice < 0) {
    showFilterModal("Price cannot be negative. Please enter values greater than or equal to 0.");
    return;
  }
  if (minPrice > maxPrice) {
    showFilterModal("Minimum price cannot be greater than maximum price.");
    return;
  }

  products = filterProductsByCategory("men");

  if (searchTerm !== "") {
    products = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm) &&
      product.price >= minPrice &&
      product.price <= maxPrice
    );
  } else {
    products = products.filter(product =>
      product.price >= minPrice &&
      product.price <= maxPrice
    );
  }

  if (products.length === 0) {
    showNoProductsFound();
    return;
  }

  products = applySorting(products);
  currentPage = 1;
  displayProducts();
}

// Reusable UI if no products found
function showNoProductsFound() {
  const productContainer = document.getElementById("product-list");
  productContainer.innerHTML = `
    <div class="container my-5 d-block w-75">
      <div class="border rounded-3 bg-light text-center p-4 p-md-5">
        <div class="bg-secondary bg-opacity-25 rounded-circle d-inline-flex p-4 mb-4">
          <i class="fas fa-search-minus fa-3x text-secondary"></i>
        </div>
        <h3 class="fw-semibold text-dark">No Products Found</h3>
        <p class="text-muted mx-auto" style="max-width: 500px;">
          We couldn't find any products matching your current filters.
          Try adjusting your search criteria or browse our other categories.
        </p>
        <div class="d-flex flex-column flex-sm-row justify-content-center gap-3 pt-3">
          <button class="btn btn-primary d-flex align-items-center justify-content-center gap-2" onclick="clearFilters()" id="clearFilterBtn">
            <i class="fas fa-sync-alt"></i>
            Clear Filters
          </button>
          <button class="btn btn-outline-secondary" onclick="browseAllProducts()">Browse All Products</button>
        </div>
      </div>
    </div>
  `;

  
}

// Clear all filters
function clearFilters() {
  document.getElementById("minPrice").value = '';
  document.getElementById("maxPrice").value = '';
  document.getElementById("searchInput").value = '';
  searchTerm = "";
  products = filterProductsByCategory("men");
  displayProducts();
}

// Reset all filters via Browse All Products
function browseAllProducts() {
  clearFilters();
}

document.getElementById("clearFilterBtn").addEventListener("click", clearFilters);
function showFilterModal(message) {
  const modalBody = document.getElementById("filterModalMessage");
  modalBody.textContent = message;
  const filterModal = new bootstrap.Modal(document.getElementById("filterModal"));
  filterModal.show();
}
// Prevent typing negative sign
function blockNegativeInput(e) {
  if (e.key === '-' || e.keyCode === 189) {
    e.preventDefault();
  }
}

// Reset value to 0 if user pastes or types a negative number
function sanitizeNegative(input) {
  if (parseFloat(input.value) < 0) {
    input.value = 0;
  }
}


//nav bar -----start
//  cart list baby
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
    document
      .getElementById("continueShopping")
      .addEventListener("click", function (e) {
        e.preventDefault();
        cartSidebar.classList.remove("active");
        cartOverlay.classList.remove("active");
      });
  } else {
    let html = `
      <div class="cart-items">
        ${cart.items
          .map(
            (item) => `
          <div class="cart-item d-flex justify-content-between align-items-center mb-3" data-id="${item.id}">
            <div class="d-flex align-items-center">
              <img src="${item.img}" alt="${
              item.name
            }" width="60" height="60" class="me-3">
              <div>
                <h6 class="mb-0">${item.name}</h6>
                <small class="text-muted">$${item.price.toFixed(2)} × ${
              item.quantity
            }</small>
              </div>
            </div>
            <div class="d-flex align-items-center">
              <span class="fw-bold me-3">$${(item.price * item.quantity).toFixed(
                2
              )}</span>
              <button class="btn btn-sm btn-outline-danger remove-item">
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>
        `
          )
          .join("")}
      </div>
      <hr>
      <div class="d-flex justify-content-between fw-bold">
        <span>Total:</span>
        <span>$${cart.total.toFixed(2)}</span>
      </div>
    `;

    cartContent.innerHTML = html;

    // Add event listeners to remove buttons
    document.querySelectorAll(".remove-item").forEach((button) => {
      button.addEventListener("click", function() {
        const cartItem = this.closest(".cart-item");
        const productId = parseInt(cartItem.getAttribute("data-id"));
        removeFromCart(productId);
      });
    });

    // Update footer with View Cart and Checkout buttons
    cartFooter.innerHTML = `
      <div class="d-flex flex-column gap-2">
        <a href="cart.html" class="btn btn-primary">View Cart</a>
      </div>
    `;
  }
}

function removeFromCart(productId) {
  const cart = JSON.parse(sessionStorage.getItem("cart")) || {
    items: [],
    total: 0,
    count: 0,
  };

  // Find the item to remove
  const itemIndex = cart.items.findIndex((item) => item.id === productId);
  
  if (itemIndex !== -1) {
    const item = cart.items[itemIndex];
    
    // Update totals
    cart.total -= item.price * item.quantity;
    cart.count -= item.quantity;
    
    // Remove item from array
    cart.items.splice(itemIndex, 1);
    
    // Save updated cart
    sessionStorage.setItem("cart", JSON.stringify(cart));
    
    // Update display
    updateCartDisplay();
    displayProducts(); // Re-render products to reflect changes
    // Update product availability display
    
  }
}
// nav bar -------end