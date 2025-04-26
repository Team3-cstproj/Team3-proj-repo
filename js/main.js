// //  cart list baby
// const cartBtnList = document.querySelectorAll('.cart-trigger');
// const cartSidebar = document.getElementById('cartSidebar');
// const cartOverlay = document.getElementById('cartOverlay');
// const closeCartBtn = document.getElementById('closeCart');

// cartBtnList.forEach(btn => {
//   btn.addEventListener('click', (e) => {
//     e.preventDefault();
//     cartSidebar.classList.add('active');
//     cartOverlay.classList.add('active');
//   });
// });

// closeCartBtn.addEventListener('click', () => {
//   cartSidebar.classList.remove('active');
//   cartOverlay.classList.remove('active');
// });

// cartOverlay.addEventListener('click', () => {
//   cartSidebar.classList.remove('active');
//   cartOverlay.classList.remove('active');
// });



//  // ////////============================================================================

// // Wait for DOM to be fully loaded
// document.addEventListener('DOMContentLoaded', function() {


//   // Render products
//   const productsContainer = document.querySelector('.row-cols-2.row-cols-md-3.row-cols-lg-5.g-3');
//   productsContainer.innerHTML = '';

//   const products = getAllProducts();
//   const featuredProducts = products.slice(0, 10);

//   featuredProducts.forEach(product => {
//     productsContainer.innerHTML += `
//       <div class="col">
//         <a href="product.html?id=${product.id}" class="text-decoration-none text-dark">
//           <div class="card product-card" data-product-id="${product.id}">
//             <img src="${product.img}" class="card-img-top" alt="${product.name}">
//             <div class="hover-icons">
//               <a href="#" class="icon-btn cart-button" onclick="addToCart(${product.id}); return false;">
//                 <i class="fas fa-shopping-cart"></i>
//                       <sup class="bg-light rounded-circle">
//                 <span class="tooltip-text">Add to cart</span>
//                 <span class="cart-circle">
//                   <i class="fas fa-shopping-bag"></i>
//                 </span>
//               </a>
//             </div>
//             <div class="card-body">
//               <h5 class="card-title">${product.name}</h5>
//               <p class="text-muted small">${product.category === 'men' ? 'Men' : 'Women'}</p>
//               <p class="card-text">$${product.price.toFixed(2)}</p>
//               <div class="star-rating">
//                 <i class="far fa-star"></i>
//                 <i class="far fa-star"></i>
//                 <i class="far fa-star"></i>
//                 <i class="far fa-star"></i>
//                 <i class="far fa-star"></i>
//               </div>
//             </div>
//           </div>
//         </a>
//       </div>
//     `;
//   });

//   // Update cart display on page load
//   updateCartDisplay();
// });

// // Function to add product to cart
// function addToCart(productId) {
//   const product = findProductById(productId);
//   if (!product) return;

//   const cart = JSON.parse(localStorage.getItem('cart')) || { items: [], total: 0, count: 0 };

//   const existingItem = cart.items.find(item => item.id === productId);

//   if (existingItem) {
//     existingItem.quantity += 1;
//   } else {
//     cart.items.push({
//       id: product.id,
//       name: product.name,
//       price: product.price,
//       img: product.img,
//       quantity: 1
//     });
//   }

//   cart.total += product.price;
//   cart.count += 1;

//   localStorage.setItem('cart', JSON.stringify(cart));
//   updateCartDisplay();
// }

// // Function to update cart display (navbar and sidebar)
// function updateCartDisplay() {
//   const cart = JSON.parse(localStorage.getItem('cart')) || { items: [], total: 0, count: 0 };

//   document.querySelectorAll('.cart-trigger').forEach(trigger => {
//     trigger.innerHTML = `
//       <i class="fa-sharp fa-solid fa-bag-shopping"></i>
//       <sup class="bg-light rounded-circle">
//         <span class="text-dark">${cart.count}</span>
//       </sup>
//       <span class="cart-total ms-1">$${cart.total.toFixed(2)}</span>
//     `;
//   });

//   updateCartSidebar(cart);
// }

// // Function to update cart sidebar content
// function updateCartSidebar(cart) {
//   const cartContent = document.querySelector(".cart-content");
//   const cartFooter = document.querySelector(".cart-footer");

//   if (cart.items.length === 0) {
//     cartContent.innerHTML = "<p>Your cart is empty.</p>";
//     cartFooter.innerHTML = `
//       <a href="#" class="continue-shopping bg-primary" id="continueShopping">Continue Shopping</a>
//     `;

//     document.getElementById("continueShopping").addEventListener("click", function(e) {
//       e.preventDefault();
//       document.getElementById("cartSidebar").classList.remove("active");
//       document.getElementById("cartOverlay").classList.remove("active");
//     });

//     return;
//   }

//   const itemsHtml = cart.items.map(item => `
//     <div class="cart-item d-flex justify-content-between align-items-center mb-3">
//       <div class="d-flex align-items-center">
//         <img src="${item.img}" alt="${item.name}" width="60" height="60" class="me-3">
//         <div>
//           <h6 class="mb-0">${item.name}</h6>
//           <small class="text-muted">$${item.price.toFixed(2)} × ${item.quantity}</small>
//         </div>
//       </div>
//       <div>
//         <span class="fw-bold">$${(item.price * item.quantity).toFixed(2)}</span>
//       </div>
//     </div>
//   `).join('');

//   cartContent.innerHTML = `
//     <div class="cart-items">${itemsHtml}</div>
//     <hr>
//     <div class="d-flex justify-content-between fw-bold">
//       <span>Total:</span>
//       <span>$${cart.total.toFixed(2)}</span>
//     </div>
//   `;

//   cartFooter.innerHTML = `
//     <div class="d-flex flex-column gap-2">
//       <a href="cart.html" class="btn btn-primary">View Cart</a>
//     </div>
//   `;
// }

// // Utility to find product by ID
// function findProductById(id) {
//   const products = getAllProducts();
//   return products.find(product => product.id === parseInt(id));
// }

// function setupUserProfile() {
//   const userIcon = document.querySelector(".nav-link[href='login.html']");
//   const userData = JSON.parse(sessionStorage.getItem('user')); // Use consistent key
  
//   if (!userIcon) return;

//   // Create user profile dropdown container
//   const profileDropdown = document.createElement('div');
//   profileDropdown.className = 'profile-dropdown';
//   profileDropdown.style.display = 'none';
//   profileDropdown.style.position = 'absolute';
//   profileDropdown.style.right = '0';
//   profileDropdown.style.top = '100%';
//   profileDropdown.style.backgroundColor = 'white';
//   profileDropdown.style.border = '1px solid #ddd';
//   profileDropdown.style.borderRadius = '4px';
//   profileDropdown.style.padding = '10px';
//   profileDropdown.style.zIndex = '1000';
//   profileDropdown.style.minWidth = '200px';
//   profileDropdown.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
  
//   if (userData) {
//     // if User login show profile info and logout option
//     profileDropdown.innerHTML = `
//       <div class="user-info mb-2">
//         <p class="mb-1"><strong>${userData.name || 'User'}</strong></p>
//         <p class="small text-muted mb-2">${userData.email || ''}</p>
//         <p class="small">Role: ${userData.role || 'user'}</p>
//       </div>
//       <button id="logoutBtn" class="btn btn-sm btn-danger w-100">Logout</button>
//     `;
    
//     // Change icon to logged in state
//     userIcon.innerHTML = '<i class="fa-solid fa-user-check"></i>';
//     userIcon.href = '#'; // Prevent navigation to login page
//   } else {
//     // User is not login show login 
//     profileDropdown.innerHTML = `
//       <p class="mb-2">You are not logged in</p>
//       <a href="login.html" class="btn btn-sm btn-primary w-100">Login</a>
//     `;
//   }
  
//   // Add dropdown to DOM
//   userIcon.parentNode.appendChild(profileDropdown);
  
//   // Toggle dropdown on click
//   userIcon.addEventListener('click', (e) => {
//     e.preventDefault();
//     const isVisible = profileDropdown.style.display === 'block';
//     profileDropdown.style.display = isVisible ? 'none' : 'block';
//   });
  
//   // Close dropdown when clicking outside
//   document.addEventListener('click', (e) => {
//     if (!userIcon.contains(e.target) && !profileDropdown.contains(e.target)) {
//       profileDropdown.style.display = 'none';
//     }
//   });
  
//   // Add click for logout
//   if (userData) {
//     profileDropdown.querySelector('#logoutBtn').addEventListener('click', () => {
//       sessionStorage.removeItem('user'); // Use same key as above
//       window.location.href = 'login.html';
//     });
//   }
// }

// // Only call setup function when DOM is loaded - remove the duplicate call
// document.addEventListener('DOMContentLoaded', setupUserProfile);


// ////////===========================================================================================///
// ////btns color baby
// document.addEventListener('DOMContentLoaded', function() {
// document.querySelectorAll('.offer-banner .btn').forEach(button => {
//   function activate() {
//     button.style.backgroundColor = 'white';
//     button.style.color = 'black';
//   }

//   function deactivate() {
//     button.style.backgroundColor = 'transparent';
//     button.style.color = 'white';
//   }

//   button.addEventListener('mousedown', activate);
//   button.addEventListener('mouseup', deactivate);
//   button.addEventListener('mouseleave', deactivate);
//   button.addEventListener('touchstart', activate);
//   button.addEventListener('touchend', deactivate);
// });
// });

// ////////===========================================================================================////
// ////logo baby
// document.addEventListener('DOMContentLoaded', () => {
//   const logoTrack = document.getElementById('logoTrack');
//   const leftArrow = document.querySelector('.carousel-arrow.left');
//   const rightArrow = document.querySelector('.carousel-arrow.right');
//   const logoItems = document.querySelectorAll('.logo-item');
//   let currentIndex = 0;
//   let autoRotateInterval;
  
//   // Clone first few items for infinite effect
//   function cloneItemsForInfinite() {
//       const itemsToClone = Array.from(logoItems).slice(0, 4);
//       itemsToClone.forEach(item => {
//           const clone = item.cloneNode(true);
//           logoTrack.appendChild(clone);
//       });
//   }
  
//   // Update carousel position
//   function updateCarousel() {
//       const logoWidth = logoItems[0].offsetWidth;
//       const offset = -currentIndex * logoWidth;
//       logoTrack.style.transform = `translateX(${offset}px)`;
      
//       // Reset position if at the end (for infinite effect)
//       if (currentIndex >= logoItems.length) {
//           setTimeout(() => {
//               logoTrack.style.transition = 'none';
//               currentIndex = 0;
//               updateCarousel();
//               setTimeout(() => {
//                   logoTrack.style.transition = 'transform 0.5s ease';
//               }, 50);
//           }, 500);
//       }
//   }
  
//   // Move to next slide
//   function moveNext() {
//       currentIndex++;
//       updateCarousel();
//       resetAutoRotate();
//   }
  
//   // Move to previous slide
//   function movePrev() {
//       if (currentIndex <= 0) {
//           // Jump to end for infinite effect
//           logoTrack.style.transition = 'none';
//           currentIndex = logoItems.length;
//           updateCarousel();
//           setTimeout(() => {
//               logoTrack.style.transition = 'transform 0.5s ease';
//               currentIndex--;
//               updateCarousel();
//           }, 50);
//       } else {
//           currentIndex--;
//           updateCarousel();
//       }
//   }
  
//   // Auto-rotate carousel
//   function startAutoRotate() {
//       autoRotateInterval = setInterval(moveNext, 2000);
//   }
  
//   // Reset auto-rotate timer
//   function resetAutoRotate() {
//       clearInterval(autoRotateInterval);
//       startAutoRotate();
//   }
  
//   // Initialize
//   cloneItemsForInfinite();
//   startAutoRotate();
  
//   // Event listeners
//   leftArrow.addEventListener('click', movePrev);
//   rightArrow.addEventListener('click', moveNext);
  
//   // Handle window resize
//   window.addEventListener('resize', () => {
//       updateCarousel();
//   });
  
//   // Pause on hover
//   logoTrack.addEventListener('mouseenter', () => {
//       clearInterval(autoRotateInterval);
//   });
  
//   logoTrack.addEventListener('mouseleave', () => {
//       startAutoRotate();
//   });
// });
// /////======================================================================================================//
// ============ CART SIDEBAR =============
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

closeCartBtn?.addEventListener('click', () => {
  cartSidebar.classList.remove('active');
  cartOverlay.classList.remove('active');
});

cartOverlay?.addEventListener('click', () => {
  cartSidebar.classList.remove('active');
  cartOverlay.classList.remove('active');
});


// ============ DOM READY ============
document.addEventListener('DOMContentLoaded', function () {
  renderProducts();
  updateCartDisplay();
  setupUserProfile();
  setupOfferButtonEffects();
  setupLogoCarousel();
});

// ============ RENDER PRODUCTS ============
function renderProducts() {
  const container = document.querySelector('.row-cols-2.row-cols-md-3.row-cols-lg-5.g-3');
  if (!container) return;
  container.innerHTML = '';

  const products = getAllProducts();
  const featured = products.slice(0, 10);

  featured.forEach(product => {
    container.innerHTML += `
      <div class="col">
        <a href="product.html?id=${product.id}" class="text-decoration-none text-dark">
          <div class="card product-card" data-product-id="${product.id}">
            <img src="${product.img}" class="card-img-top" alt="${product.name}">
            <div class="hover-icons">
              <a href="#" class="icon-btn cart-button" onclick="addToCart(${product.id}); return false;">
                <i class="fas fa-shopping-cart"></i>
                <sup class="bg-light rounded-circle">
                  <span class="tooltip-text">Add to cart</span>
                  <span class="cart-circle">
                    <i class="fas fa-shopping-bag"></i>
                  </span>
                </sup>
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
        </a>
      </div>
    `;
  });
}

// ============ ADD TO CART ============
function addToCart(productId) {
  const product = findProductById(productId);
  if (!product) return;

  const cart = JSON.parse(localStorage.getItem('cart')) || { items: [], total: 0, count: 0 };
  const existing = cart.items.find(item => item.id === productId);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.items.push({ id: product.id, name: product.name, price: product.price, img: product.img, quantity: 1 });
  }

  cart.total += product.price;
  cart.count += 1;

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartDisplay();
}

// ============ CART DISPLAY ============
function updateCartDisplay() {
  const cart = JSON.parse(localStorage.getItem('cart')) || { items: [], total: 0, count: 0 };

  document.querySelectorAll('.cart-trigger').forEach(trigger => {
    trigger.innerHTML = `
      <i class="fa-sharp fa-solid fa-bag-shopping"></i>
      <sup class="bg-light rounded-circle"><span class="text-dark">${cart.count}</span></sup>
      <span class="cart-total ms-1">$${cart.total.toFixed(2)}</span>
    `;
  });

  updateCartSidebar(cart);
}

function updateCartSidebar(cart) {
  const cartContent = document.querySelector(".cart-content");
  const cartFooter = document.querySelector(".cart-footer");

  if (!cartContent || !cartFooter) return;

  if (cart.items.length === 0) {
    cartContent.innerHTML = "<p>Your cart is empty.</p>";
    cartFooter.innerHTML = `<a href="#" class="continue-shopping bg-primary" id="continueShopping">Continue Shopping</a>`;
    document.getElementById("continueShopping")?.addEventListener("click", e => {
      e.preventDefault();
      cartSidebar.classList.remove("active");
      cartOverlay.classList.remove("active");
    });
    return;
  }

  const itemsHtml = cart.items.map(item => `
    <div class="cart-item d-flex justify-content-between align-items-center mb-3">
      <div class="d-flex align-items-center">
        <img src="${item.img}" alt="${item.name}" width="60" height="60" class="me-3">
        <div>
          <h6 class="mb-0">${item.name}</h6>
          <small class="text-muted">$${item.price.toFixed(2)} × ${item.quantity}</small>
        </div>
      </div>
      <div><span class="fw-bold">$${(item.price * item.quantity).toFixed(2)}</span></div>
    </div>
  `).join('');

  cartContent.innerHTML = `
    <div class="cart-items">${itemsHtml}</div>
    <hr>
    <div class="d-flex justify-content-between fw-bold"><span>Total:</span><span>$${cart.total.toFixed(2)}</span></div>
  `;

  cartFooter.innerHTML = `<div class="d-flex flex-column gap-2"><a href="cart.html" class="btn btn-primary">View Cart</a></div>`;
}

// ============ FIND PRODUCT ============
function findProductById(id) {
  const products = getAllProducts();
  return products.find(product => product.id === parseInt(id));
}

// ============ USER PROFILE ============
function setupUserProfile() {
  const userIcon = document.querySelector(".nav-link[href='login.html']");
  const userData = JSON.parse(sessionStorage.getItem('user'));
  if (!userIcon) return;

  const profileDropdown = document.createElement('div');
  profileDropdown.className = 'profile-dropdown';
  Object.assign(profileDropdown.style, {
    display: 'none',
    position: 'absolute',
    right: '0',
    top: '100%',
    backgroundColor: 'white',
    border: '1px solid #ddd',
    borderRadius: '4px',
    padding: '10px',
    zIndex: '1000',
    minWidth: '200px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
  });

  if (userData) {
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
  } else {
    profileDropdown.innerHTML = `
      <p class="mb-2">You are not logged in</p>
      <a href="login.html" class="btn btn-sm btn-primary w-100">Login</a>
    `;
  }

  userIcon.parentNode.appendChild(profileDropdown);

  userIcon.addEventListener('click', (e) => {
    e.preventDefault();
    profileDropdown.style.display = profileDropdown.style.display === 'block' ? 'none' : 'block';
  });

  document.addEventListener('click', (e) => {
    if (!userIcon.contains(e.target) && !profileDropdown.contains(e.target)) {
      profileDropdown.style.display = 'none';
    }
  });

  if (userData) {
    profileDropdown.querySelector('#logoutBtn')?.addEventListener('click', () => {
      sessionStorage.removeItem('user');
      window.location.href = 'login.html';
    });
  }
}

// ============ OFFER BUTTON EFFECT ============
function setupOfferButtonEffects() {
  document.querySelectorAll('.offer-banner .btn').forEach(button => {
    const activate = () => {
      button.style.backgroundColor = 'white';
      button.style.color = 'black';
    };
    const deactivate = () => {
      button.style.backgroundColor = 'transparent';
      button.style.color = 'white';
    };

    button.addEventListener('mousedown', activate);
    button.addEventListener('mouseup', deactivate);
    button.addEventListener('mouseleave', deactivate);
    button.addEventListener('touchstart', activate);
    button.addEventListener('touchend', deactivate);
  });
}

// ============ LOGO CAROUSEL ============
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
