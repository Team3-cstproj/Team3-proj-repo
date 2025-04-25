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
});
// nav bar -------end

///////////////////////////////
// Product Details and Cart Functionality
/////////////////////////////
document.addEventListener("DOMContentLoaded", function() {
  // Get all products from localStorage
  const products = JSON.parse(localStorage.getItem('products')) || [];
  
  // Get product ID from URL or use first product as default
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get('id'));
  
  let product;
  if (productId) {
    product = products.find(p => p.id === productId);
  } else {
    product = products[0]; // Acess first product
  }
  
  // If product found, display its details
  if (product) {
    displayProductDetails(product);
    setupAddToCart(product);
    displayRelatedProducts(product);
  } else {
    console.error("No products found");
  }

  // Initialize cart if not exists
  if (!localStorage.getItem('cart')) {
    localStorage.setItem('cart', JSON.stringify({
      items: [],
      total: 0,
      count: 0
    }));
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
  categoryLinks.forEach(link => {
    link.textContent = product.category.charAt(0).toUpperCase() + product.category.slice(1);
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
  descImages.forEach(img => {
    img.src = product.img;
    img.alt = product.name;
  });

  // Update additional info tab
  updateAdditionalInfo(product);
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
      const quantity = parseInt(quantityInput.value) || 1;
      
      addToCart(product, quantity);
      
      // update the cart display which will show the changes
      updateCartDisplay();
    });
  }
}

function addToCart(product, quantity) {
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
  cart.total += product.price * quantity;
  cart.count += quantity;
  
  // Save to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartDisplay() {
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
////////////End of add to cart////////////////
///////////////////////////////////////


///////related prouduct part
//////////////////////////
function displayRelatedProducts(currentProduct) {
  const products = JSON.parse(localStorage.getItem('products')) || [];
  
  // Filter related products (same category, excluding current product)
  const relatedProducts = products.filter(p => 
    p.category === currentProduct.category && p.id !== currentProduct.id
  ).slice(0, 3); // Get first 3 related products
  
  const relatedContainer = document.querySelector(".row-cols-lg-3");
  
  if (relatedContainer && relatedProducts.length > 0) {
    relatedContainer.innerHTML = relatedProducts.map(product => `
      <div class="col">
        <div class="card product-card">
          <a href="product.html?id=${product.id}" class="product-image-link">
            <img src="${product.img}" class="card-img-top" alt="${product.name}">
          </a>
          <div class="hover-icons">
            <a href="#" class="icon-btn cart-button" data-id="${product.id}">
              <i class="fas fa-shopping-cart"></i>
              <span class="tooltip-text">Add to cart</span>
              <span class="cart-circle">
                <i class="fas fa-shopping-bag"></i>
              </span>
            </a>
          </div>
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="text-muted small">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</p>
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
    `).join('');
    
    // Add event listeners to related product "Add to cart" buttons
    document.querySelectorAll(".cart-button").forEach(button => {
      button.addEventListener("click", function(e) {
        e.preventDefault();
        const productId = parseInt(this.getAttribute("data-id"));
        const product = products.find(p => p.id === productId);
        if (product) {
          addToCart(product, 1);
          updateCartDisplay();
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
  const productId = parseInt(urlParams.get('id'));
  
  // Get product from localStorage
  const products = JSON.parse(localStorage.getItem('products')) || [];
  const product = products.find(p => p.id === productId);
  
  if (product) {
    // Display existing reviews on page load
    displayProductReviews(product);
  
    // Review form submission
    const reviewForm = document.querySelector("#reviews-tab-pane form");
    if (reviewForm) {
      reviewForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById("reviewerName").value;
        const email = document.getElementById("reviewerEmail").value;
        const reviewText = document.getElementById("reviewText").value;
        const rating = document.querySelector('input[name="rating"]:checked')?.value || 0;

        // Create new review object
        const newReview = {
          userId: Date.now(), //  unique ID I will change it according the use log in later
          username: name,
          rating: parseInt(rating),
          comment: reviewText,
          date: new Date().toISOString().split('T')[0] 
        };

        // Add review to product
        if (!product.reviews) {
          product.reviews = [];
        }
        product.reviews.unshift(newReview); // Add to beginning the first reviw

        // Update product in localStorage
        const productIndex = products.findIndex(p => p.id === product.id);
        if (productIndex !== -1) {
          products[productIndex] = product;
          localStorage.setItem('products', JSON.stringify(products));
        }

        // Update display
        displayProductReviews(product);

        // Reset the form
        reviewForm.reset();

        // Uncheck all stars
        document.querySelectorAll('input[name="rating"]').forEach((star) => {
          star.checked = false;
        });
      });
    }
  }

  // Function to display product reviews
  function displayProductReviews(product) {
    const reviewsContainer = document.querySelector("#reviews-tab-pane .divider").previousElementSibling;
    const noReviewsMsg = "There are no reviews yet.";

    if (!reviewsContainer) return;

    // Clear existing content
    reviewsContainer.innerHTML = "";

    if (!product.reviews || product.reviews.length === 0) {
      reviewsContainer.textContent = noReviewsMsg;
      return;
    }

    // Create a container for all reviews
    const allReviewsContainer = document.createElement("div");
    allReviewsContainer.className = "all-reviews";

    // Add each review
    product.reviews.forEach((review) => {
      allReviewsContainer.appendChild(createReviewElement(review));
    });

    reviewsContainer.appendChild(allReviewsContainer);
  }

  // Function to create a review element
  function createReviewElement(review) {
    const reviewDiv = document.createElement("div");
    reviewDiv.className = "review mb-4 p-3 bg-light rounded";

    // Create star rating
    const starsDiv = document.createElement("div");
    starsDiv.className = "star-rating mb-2";

    for (let i = 1; i <= 5; i++) {
      const star = document.createElement("i");
      star.className = i <= review.rating ? "fas fa-star text-warning" : "far fa-star";
      starsDiv.appendChild(star);
    }

    // Create reviewer info
    const reviewerInfo = document.createElement("div");
    reviewerInfo.className = "reviewer-info mb-2 d-flex justify-content-between";

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

  // Star rating interaction
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

    // Hover effect for stars
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