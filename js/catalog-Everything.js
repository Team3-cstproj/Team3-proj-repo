
// document.addEventListener('DOMContentLoaded', function () {
//     const productCards = document.querySelectorAll('.product-card');

//     productCards.forEach(card => {
//         const colorOptions = card.querySelectorAll('.color-option');
//         const images = card.querySelectorAll('.product-image img');

//         colorOptions.forEach(option => {
//             option.addEventListener('click', function () {
//                 // Remove active class from all color options in this card
//                 colorOptions.forEach(opt => opt.classList.remove('active'));
//                 this.classList.add('active');

//                 const selectedColor = this.getAttribute('data-color');

//                 // Update images in this card
//                 images.forEach(img => {
//                     img.classList.remove('active');
//                     if (img.getAttribute('data-color') === selectedColor) {
//                         img.classList.add('active');
//                     }
//                 });
//             });
//         });
//     });
// });



// Sample products array to simulate your data
function getAllProducts() {
  const products = localStorage.getItem('products');
  return products ? JSON.parse(products) : [];
}
let products = getAllProducts(); // Fetch products from localStorage or use a sample array

let productsPerPage = 12;
let currentPage = 1;

function displayProducts() {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = currentPage * productsPerPage;
    const productsToDisplay = products.slice(startIndex, endIndex);

    const productContainer = document.getElementById("product-list") 
    console.log(productContainer);
    productContainer.innerHTML = '';  // Clear the current products

    productsToDisplay.forEach(product => {
        const productCard = `
        <div class="col">
            <div class="card product-card">
                <img src="${product.img}" class="card-img-top" alt="${product.name}">
                <div class="hover-icons">
                    <a href="#" class="icon-btn cart-button">
                        <i class="fas fa-shopping-cart"></i>
                        <span class="tooltip-text">Add to cart</span>
                    </a>
                </div>
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="text-muted small">${product.category}</p>
                    <p class="card-text">$${product.price}</p>
                    <div class="star-rating">
                        <!-- Star rating goes here -->
                    </div>
                </div>
            </div>
        </div>
        `;
        productContainer.innerHTML += productCard;
    });

    updatePagination();
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






//nav bar -----strart
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