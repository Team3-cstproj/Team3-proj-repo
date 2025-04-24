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
    const bestSellerProductCard = `
    <li class="list-group-item bg-light">
                            <div class="container-fluid">
                                <div class="row g-0 align-items-center">
                                    <div class="col-5 ">
                                        <img src="${product.img}"  alt="${product.name}" class="img-fluid  ">
                                    </div>
                                    <div class="col-6 mx-auto">
                                        <div class="card-body p-2">
                                            <h7 class="card-title">${product.name}</h7>
                                            <div class="star-rating small ">
                                                <i class="far fa-star"></i>
                                                <i class="far fa-star"></i>
                                                <i class="far fa-star"></i>
                                                <i class="far fa-star"></i>
                                                <i class="far fa-star"></i>
                                            </div>
                                            <p class="card-text">$${product.price}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>`;
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

// search bar
let searchTerm = "";
document.getElementById("searchBtn").addEventListener("click", searchByWord);
function searchByWord() {
    searchTerm = document.getElementById("searchInput").value.trim().toLowerCase();



    if (searchTerm === "") {
        products = filterProductsByCategory("men");  // Reset to all products if search is empty
        products = applySorting(products); // Reapply sorting
        displayProducts(); // Update the display
        return; // Don't change anything if search is empty
    }


    // 1. Filter products by name
    products = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm)
    );
    if (products.length === 0) {
        alert("No products found matching your search term.");
        products = filterProductsByCategory("men");  // Reset to all products if no match found
        products = applySorting(products); // Reapply sorting
        displayProducts(); // Update the display

    }


    // 2. Apply sorting to the filtered products
    products = applySorting(products);


    displayProducts();
}

// Filter by price range
document.getElementById("filterPriceBtn").addEventListener("click", function () {
    let minPrice = parseFloat(document.getElementById("minPrice").value) || 0;
    let maxPrice = parseFloat(document.getElementById("maxPrice").value) || Infinity;

    if (minPrice > maxPrice) {
        alert("Minimum price cannot be greater than maximum price.");
        return; // Don't apply filter if invalid range
    }
    console.log(searchTerm);
    if(searchTerm !== "") {

        products = filterProductsByCategory("men").filter(product =>product.name.toLowerCase().includes(searchTerm) && product.price >= minPrice && product.price <= maxPrice)
    } else {
        products = filterProductsByCategory("men").filter(p => p.price >= minPrice && p.price <= maxPrice);
    }
    console.log(products);

    products = applySorting(products); // Reapply sorting after filtering

    currentPage = 1;
    displayProducts();
});

document.getElementById("clearFilterBtn").addEventListener("click", function () {
    document.getElementById("minPrice").value = '';
    document.getElementById("maxPrice").value = '';
    products = filterProductsByCategory("men");
    searchByWord(); // Reset search term
    // products = filterProductsByCategory("men");  // Reset to all products
    // products = applySorting(products); // Reapply sorting
    // currentPage = 1;
    // displayProducts();
});








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