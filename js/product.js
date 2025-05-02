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

////btns color 
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

// Enhanced loginlogout 
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
    //  User login show profile info and logout option
    profileDropdown.innerHTML = `
      <div class="user-info mb-2">
        <p class="mb-1"><strong>${userData.name || "User"}</strong></p>
        <p class="small text-muted mb-2">${userData.email || ""}</p>
        <p class="small">Role: ${userData.role || "user"}</p>
      </div>
      <button id="editbtn" class="btn btn-sm btn-secondary w-100 mb-1">Edit Info</button>
      <button id="logoutBtn" class="btn btn-sm btn-danger w-100">Logout</button>
    `;

    // Change icon to  logged in 
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

  // Add dropdown 
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

// Call setup function 
document.addEventListener("DOMContentLoaded", setupUserProfile);
// nav bar -------end

///////////////////////////////
// Product Details and Cart Functionality
/////////////////////////////
document.addEventListener("DOMContentLoaded", function () {
  // Get all products from localStorage
  const products = JSON.parse(localStorage.getItem("products")) || [];

  // Get product ID from URL or use first product as default
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get("id"));

  let product;
  if (productId) {
    product = products.find((p) => p.id === productId);
  } else {
    product = products[0]; // Access first product
  }

  // If product found display its details
  if (product) {
    displayProductDetails(product);
    setupAddToCart(product);
    displayRelatedProducts(product);
  } else {
    console.error("No products found");
  }

  // Initialize cart if not exists
  if (!sessionStorage.getItem("cart")) {
    sessionStorage.setItem(
      "cart",
      JSON.stringify({
        items: [],
        total: 0,
        count: 0,
      })
    );
  }

  // Update cart display
  updateCartDisplay();
});

function displayProductDetails(product) {
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
  categoryLinks.forEach((link) => {
    link.textContent =
      product.category.charAt(0).toUpperCase() + product.category.slice(1);
    link.href = `catalog-${product.category}.html`; // Update href based on category
  });

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
  descImages.forEach((img) => {
    img.src = product.img;
    img.alt = product.name;
  });

  const storeName = document.getElementById("storeName");
  const storeName1 = document.getElementById("storeName1");
  const descriptionDetails = document.getElementById("description-full-product-detailes");
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let seller = users.find((u) => u.id === product.sellerId);
  if (seller.name){
    storeName.textContent = ` ${seller.name}'s Store`;
    storeName1.textContent = `${seller.name}'s Store`;
  }
  if (product.description) {
    
    descriptionDetails.innerHTML = product.description
      .split("\n")
      .map((line) => `<p>${line}</p>`)
      .join("");
  }


  // Update quantity input max value and available 
  const quantityInput = document.getElementById("quantity");
  if (quantityInput) {
    // Calculate  available quantity
    const cart = JSON.parse(sessionStorage.getItem("cart")) || { items: [] };
    const cartItem = cart.items.find(item => item.id === product.id);
    const available = product.availible - (cartItem ? cartItem.quantity : 0);
    quantityInput.max = available;
    
    // Find or create available quantity display
    const quantityContainer = quantityInput.closest(".me-3");
    let availableDisplay = quantityContainer.querySelector(".available-display");
    if (!availableDisplay) {
      availableDisplay = document.createElement("div");
      availableDisplay.className = "text-muted small mt-1 available-display";
      quantityContainer.appendChild(availableDisplay);
    }
    availableDisplay.textContent = `${available} available`;
  }

  // Update add to cart button based on availability
  const addToCartBtn = document.querySelector(".add-to-cart-btn");
  if (addToCartBtn) {
    const available = quantityInput ? parseInt(quantityInput.max) : 0;
    if (available <= 0) {
      addToCartBtn.disabled = true;
      addToCartBtn.textContent = "OUT OF STOCK";
      
      // Create out of stock message
      const outOfStockMsg = document.createElement("div");
      outOfStockMsg.className = "text-danger small mt-2";
      outOfStockMsg.textContent = "This product is currently out of stock";
      addToCartBtn.parentNode.appendChild(outOfStockMsg);
    } else {
      addToCartBtn.disabled = false;
      addToCartBtn.textContent = "ADD TO CART";
      
      // Remove out of stock message if exists
      const outOfStockMsg = addToCartBtn.parentNode.querySelector(".text-danger.small");
      if (outOfStockMsg) {
        outOfStockMsg.remove();
      }
    }
  }

  //  quantity input validation
  if (quantityInput) {
    quantityInput.addEventListener("change", function() {
      if (parseInt(this.value) > parseInt(this.max)) {
        this.value = this.max;
      }
      if (parseInt(this.value) < parseInt(this.min)) {
        this.value = this.min;
      }
    });
  }

  // Update additional info tab
  updateAdditionalInfo(product);
}

function updateAdditionalInfo(product) {
  // Update the additional information part
  const additionalInfoTab = document.querySelector(
    "#additional-info-tab-pane tbody"
  );
  if (additionalInfoTab) {
    additionalInfoTab.innerHTML = `
      <tr>
        <th scope="row" style="width: 30%">Category</th>
        <td>${
          product.category.charAt(0).toUpperCase() + product.category.slice(1)
        }</td>
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
      let quantity = parseInt(quantityInput.value) || 1;
      
      // Get current cart
      const cart = JSON.parse(sessionStorage.getItem("cart")) || {
        items: [],
        total: 0,
        count: 0,
      };
      
      //get available quantity
      const products = JSON.parse(localStorage.getItem("products")) || [];
      const originalProduct = products.find(p => p.id === product.id);
      const cartItem = cart.items.find(item => item.id === product.id);
      const available = originalProduct.availible - (cartItem ? cartItem.quantity : 0);
      
      // Ensure we don't add more than available
      if (quantity > available) {
        quantity = available;
        quantityInput.value = quantity;
      }

      if (quantity > 0) {
        addToCart(product, quantity);
        updateCartDisplay();
        const availableDisplay = document.querySelector(".available-display");
        if (availableDisplay) {
          const newAvailable = available - quantity;
          availableDisplay.textContent = `${newAvailable} available`;
          
          // Update button if out of stock
          if (newAvailable <= 0) {
            addToCartBtn.disabled = true;
            addToCartBtn.textContent = "OUT OF STOCK";
            
            if (!document.querySelector(".text-danger.small")) {
              const outOfStockMsg = document.createElement("div");
              outOfStockMsg.className = "text-danger small mt-2";
              outOfStockMsg.textContent = "This product is currently out of stock";
              addToCartBtn.parentNode.appendChild(outOfStockMsg);
            }
          }
        }
      }
    });
  }
}

function addToCart(product, quantity) {
  const cart = JSON.parse(sessionStorage.getItem("cart")) || {
    items: [],
    total: 0,
    count: 0,
  };

  // Check if product already in cart
  const existingItem = cart.items.find((item) => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({
      id: product.id,
      name: product.name,
      price: product.price,
      img: product.img,
      quantity: quantity,
    });
  }

  // Update cart totals
  cart.total += product.price * quantity;
  cart.count += quantity;

  // Save to sessionStorage
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartDisplay() {
  const cart = JSON.parse(sessionStorage.getItem("cart")) || {
    items: [],
    total: 0,
    count: 0,
  };

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

  // Update cart sidebar 
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

    //  continue shopping button
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

    // remove buttons
    document.querySelectorAll(".remove-item").forEach((button) => {
      button.addEventListener("click", function() {
        const cartItem = this.closest(".cart-item");
        const productId = parseInt(cartItem.getAttribute("data-id"));
        removeFromCart(productId);
      });
    });

    // Update footer with View Cart 
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
    
    // Update product availability display
    updateProductAvailability(productId, item.quantity);
  }
}

function updateProductAvailability(productId, returnedQuantity = 0) {
  // Get current product ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const currentProductId = parseInt(urlParams.get("id"));
  
  if (currentProductId === productId) {
    // Update the displayed available quantity
    const quantityInput = document.getElementById("quantity");
    if (quantityInput) {
      const products = JSON.parse(localStorage.getItem("products")) || [];
      const product = products.find(p => p.id === productId);
      const cart = JSON.parse(sessionStorage.getItem("cart")) || { items: [] };
      const cartItem = cart.items.find(item => item.id === productId);
      
      const available = product.availible - (cartItem ? cartItem.quantity : 0);
      quantityInput.max = available;
      
      const availableDisplay = document.querySelector(".available-display");
      if (availableDisplay) {
        availableDisplay.textContent = `${available} available`;
      }
      
      // Enable add to cart button if it was disabled
      const addToCartBtn = document.querySelector(".add-to-cart-btn");
      if (addToCartBtn && available > 0) {
        addToCartBtn.disabled = false;
        addToCartBtn.textContent = "ADD TO CART";
        
        // Remove out of stock message if exists
        const outOfStockMsg = addToCartBtn.parentNode.querySelector(".text-danger.small");
        if (outOfStockMsg) {
          outOfStockMsg.remove();
        }
      }
    }
  }
  
  // Update related products display
  if (currentProductId) {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const currentProduct = products.find(p => p.id === currentProductId);
    if (currentProduct) {
      displayRelatedProducts(currentProduct);
    }
  }
}

////////////End of add to cart////////////////
///////////////////////////////////////

///////related prouduct part
//////////////////////////
function displayRelatedProducts(currentProduct) {
  const products = JSON.parse(localStorage.getItem("products")) || [];

  const relatedProducts = products
    .filter(
      (p) => p.category === currentProduct.category && p.id !== currentProduct.id
    )
    .slice(0, 3); // Limit to 3 related products

  const relatedContainer = document.querySelector(".row-cols-lg-3");

  if (relatedContainer && relatedProducts.length > 0) {
    const cart = JSON.parse(sessionStorage.getItem("cart")) || {
      items: [],
      total: 0,
      count: 0,
    };

    relatedContainer.innerHTML = relatedProducts
      .map((product) => {
        // Ensure reviews exist
        if (!product.reviews || product.reviews.length === 0) {
          product.reviews = [{ rating: 0 }];
        }

        const ratings = product.reviews.map(r => r.rating);
        const avgRating = ratings.length
          ? ratings.reduce((a, b) => a + b) / ratings.length
          : 0;

        // Generate star 
        let starHtml = '';
        for (let i = 1; i <= 5; i++) {
          starHtml += `<i class="${i <= Math.round(avgRating) ? 'fas' : 'far'} fa-star"></i>`;
        }

        // Check availability considering cart
        let available = product.availible;
        const existingItem = cart.items.find(item => item.id === product.id);
        if (existingItem) {
          available -= existingItem.quantity;
        }

        // Stock info
        let stockInfoHtml = '';
        if (available > 0) {
          stockInfoHtml = `<p class="text-success small">Available: ${available}</p>`;
        } else {
          stockInfoHtml = `<p class="text-danger small fw-bold">Out of Stock</p>`;
        }

        // Hover cart icon
        let hoverCartHtml = '';
        if (available > 0) {
          hoverCartHtml = `
            <div class="hover-icons">
              <a href="#" class="icon-btn cart-button" data-id="${product.id}">
                <i class="fas fa-shopping-cart"></i>
                <span class="tooltip-text">Add to cart</span>
                <span class="cart-circle">
                  <i class="fas fa-shopping-bag"></i>
                </span>
              </a>
            </div>
          `;
        }

        return `
          <div class="col">
            <div class="card product-card">
              <a href="product.html?id=${product.id}" class="product-image-link">
                <img src="${product.img}" class="card-img-top" alt="${product.name}">
              </a>
              ${hoverCartHtml}
              <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="text-muted small">${
                  product.category.charAt(0).toUpperCase() + product.category.slice(1)
                }</p>
                <p class="card-text">$${product.price.toFixed(2)}</p>
                ${stockInfoHtml}
                <div class="star-rating">
                  ${starHtml}
                </div>
              </div>
            </div>
          </div>
        `;
      })
      .join("");

    //updated buttons
    document.querySelectorAll(".cart-button").forEach((button) => {
      button.addEventListener("click", function (e) {
        e.preventDefault();

        const productId = parseInt(this.getAttribute("data-id"));
        const product = products.find((p) => p.id === productId);
        if (product) {
          addToCart(product, 1);
          updateCartDisplay();

          this.classList.add('disabled'); 
          this.querySelector('.tooltip-text').textContent = 'Adding to cart...'; 
          const tooltip = this.querySelector('.tooltip-text');
          const buttonEl = this;

          if (tooltip) {
            const originalText = tooltip.textContent;
            buttonEl.classList.add('success-feedback');
            tooltip.textContent = 'Successfully added to cart';
            setTimeout(() => {
              buttonEl.classList.add('fade-out');
              tooltip.textContent = originalText;
              setTimeout(() => {
                buttonEl.classList.remove('success-feedback', 'fade-out');
                buttonEl.classList.remove('disabled');
                buttonEl.querySelector('.tooltip-text').textContent = 'Add to cart'; 
                displayRelatedProducts(currentProduct); 
              }, 500); 
            }, 1500);
          } else {
            displayRelatedProducts(currentProduct);
          }
        }
      });
    });
  }
}


///////////////////////////////
// handel reviw part
/////////////////////////////
document.addEventListener("DOMContentLoaded", function () {
  // Get product ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get("id"));

  // Get product from localStorage
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const product = products.find((p) => p.id === productId);

  if (product) {
    // Display existing reviews on page load
    displayProductReviews(product);

    // Review form submission
    const reviewForm = document.querySelector("#reviews-tab-pane form");
    if (reviewForm) {
      // Check if user is logged in
      const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
      
      if (currentUser) {
        // User is logged in
        document.getElementById("reviewerName").value = currentUser.name || "";
        document.getElementById("reviewerEmail").value = currentUser.email || "";
        
        // Make fields disabled
        document.getElementById("reviewerName").disabled = true;
        document.getElementById("reviewerEmail").disabled = true;
        
        // Show message that review will be posted as logged in user
        const userMessage = document.createElement("p");
        userMessage.className = "text-muted small mb-3";
        userMessage.textContent = `You're posting as ${currentUser.name}`;
        reviewForm.insertBefore(userMessage, reviewForm.firstChild);
      } else {
        // User is not logged in disable the entire form
        reviewForm.innerHTML = `
          <div class="alert alert-info">
            You must be <a href="login.html">logged in</a> to submit a review.
          </div>
        `;
        return; 
      }

      reviewForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Get form values from session
        const name = document.getElementById("reviewerName").value;
        const email = document.getElementById("reviewerEmail").value;
        const reviewText = document.getElementById("reviewText").value;
        const rating =
          document.querySelector('input[name="rating"]:checked')?.value || 0;

        // Validate review text
        if (!reviewText.trim()) {
          return;
        }

        // Validate rating
        if (rating === 0) {
          return;
        }

        // Create new review object
        const newReview = {
          userId: currentUser.id,
          username: name,
          userEmail: email,
          rating: parseInt(rating),
          comment: reviewText,
          date: new Date().toISOString().split("T")[0],
        };

        // Add review to product
        if (!product.reviews) {
          product.reviews = [];
        }
        product.reviews.unshift(newReview); // Add  the the review first reviw

        // Update product in localStorage
        const productIndex = products.findIndex((p) => p.id === product.id);
        if (productIndex !== -1) {
          products[productIndex] = product;
          localStorage.setItem("products", JSON.stringify(products));
        }

        // Update display
        displayProductReviews(product);

        // Reset the form 
        document.getElementById("reviewText").value = "";
        document.querySelectorAll('input[name="rating"]').forEach((star) => {
          star.checked = false;
        });

        // Show success message
        const successMsg = document.createElement("div");
        successMsg.className = "alert alert-success mt-3";
        successMsg.textContent = "Thank you for your review!";
        reviewForm.appendChild(successMsg);
        
        // Remove success message 
        setTimeout(() => {
          successMsg.remove();
        }, 3000);
      });
    }
  }

  // display product reviews
  function displayProductReviews(product) {
    const reviewsContainer = document.querySelector(
      "#reviews-tab-pane .divider"
    ).previousElementSibling;
    const noReviewsMsg = "There are no reviews yet.";

    if (!reviewsContainer) return;

    reviewsContainer.innerHTML = "";

    if (!product.reviews || product.reviews.length === 0) {
      reviewsContainer.textContent = noReviewsMsg;
      return;
    }

    // Create a container for all reviews
    const allReviewsContainer = document.createElement("div");
    allReviewsContainer.className = "all-reviews";

    // Add all review
    product.reviews.forEach((review) => {
      allReviewsContainer.appendChild(createReviewElement(review));
    });

    reviewsContainer.appendChild(allReviewsContainer);
  }

  // create a review element
  function createReviewElement(review) {
    const reviewDiv = document.createElement("div");
    reviewDiv.className = "review mb-4 p-3 bg-light rounded";

    // Create star rating
    const starsDiv = document.createElement("div");
    starsDiv.className = "star-rating mb-2";

    for (let i = 1; i <= 5; i++) {
      const star = document.createElement("i");
      star.className =
        i <= review.rating ? "fas fa-star text-warning" : "far fa-star";
      starsDiv.appendChild(star);
    }

    // Create reviewer info
    const reviewerInfo = document.createElement("div");
    reviewerInfo.className =
      "reviewer-info mb-2 d-flex justify-content-between";

    reviewerInfo.innerHTML = `
      <strong>${review.username}</strong>
      <small class="text-muted">${review.date}</small>
    `;

    // Create review text
    const reviewText = document.createElement("div");
    reviewText.className = "review-text";
    reviewText.textContent = review.comment;

    // Append all elements
    reviewDiv.appendChild(starsDiv);
    reviewDiv.appendChild(reviewerInfo);
    reviewDiv.appendChild(reviewText);

    return reviewDiv;
  }

  // Star rating 
  const stars = document.querySelectorAll(".rating-stars .star");
  stars.forEach((star) => {
    star.addEventListener("click", function () {
      const input = this.previousElementSibling;
      input.checked = true;

      // Update star display
      const rating = parseInt(input.value);
      const allStars = document.querySelectorAll(".rating-stars .star i");

      allStars.forEach((s, index) => {
        if (index < rating) {
          s.classList.remove("far");
          s.classList.add("fas");
        } else {
          s.classList.remove("fas");
          s.classList.add("far");
        }
      });
    });

    // Hover  for stars
    star.addEventListener("mouseover", function () {
      const input = this.previousElementSibling;
      const rating = parseInt(input.value);

      document.querySelectorAll(".rating-stars .star i").forEach((s, index) => {
        if (index < rating) {
          s.classList.add("hovered");
        }
      });
    });

    star.addEventListener("mouseout", function () {
      document.querySelectorAll(".rating-stars .star i").forEach((s) => {
        s.classList.remove("hovered");
      });
    });
  });
});