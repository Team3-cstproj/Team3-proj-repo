const allowedRoles = ['seller']; // Customize this for each page
      
        const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
      
        if (!currentUser || !allowedRoles.includes(currentUser.role)) {
          window.location.href = 'error.html';
        }


document.addEventListener("DOMContentLoaded", function () {
    const info = JSON.parse(sessionStorage.getItem("currentUser")) || [];
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const tbody = document.querySelector("table tbody");
    const pagination = document.querySelector(".pagination");
    const menuBtn = document.querySelector("#menu_bar");
    const closeBtn = document.querySelector("#close_btn");
    const sideMenue = document.querySelector("aside");
    document.getElementById("seller_name").textContent = info.username;
    document.getElementById("clearUser").addEventListener("click", function () {
        sessionStorage.clear();
        })
    let currentPage = 1;
    const rowsPerPage = 5;
    let seller_product = products.filter(product => product.sellerId == info.id);

    let flag = JSON.parse(sessionStorage.getItem("flag"));
    if(flag % 2 == 0){
        document.body.classList.toggle("dark-theme-variables");
        themToggler.querySelector("span:nth-child(1)").classList.toggle("active");
        themToggler.querySelector("span:nth-child(2)").classList.toggle("active");
    }
    const themToggler = document.querySelector(".theme-toggler");
    themToggler.addEventListener("click", () => {
        document.body.classList.toggle("dark-theme-variables");
        themToggler.querySelector("span:nth-child(1)").classList.toggle("active");
        themToggler.querySelector("span:nth-child(2)").classList.toggle("active");
    });
  
    menuBtn.addEventListener("click", () => {
        sideMenue.style.display = "block";
        menuBtn.style.display = "none"
    })
    closeBtn.addEventListener("click", () => {
        sideMenue.style.display = "none";
        menuBtn.style.display = "block";

    })

    function displayProducts(products, wrapper, rowsPerPage, page) {
        wrapper.innerHTML = "";
        page--;
        console.log(products);
        let start = page * rowsPerPage;
        let end = start + rowsPerPage;
        let paginatedItems = products.slice(start, end);
        paginatedItems.forEach((product, index) => {
            console.log(products);
            console.log(paginatedItems);
            console.log(product.sellerId);
            const row = document.createElement("tr");
            row.innerHTML = `
                <td style="width: 20%;">${product.name}</td>
                <td>${product.category}</td>
                <td>${product.sold}</td>
                <td class="available-cell">${product.availible}</td>
                <td class="price-cell">${product.price}</td>
                <td class = "stock" style{text-align: center;} class="${product.availible != 0 ? 'primary' : 'warning'}">
                    ${product.availible != 0 ? 'inStock' : 'Out of Stock'}
                </td>                <td class="action-buttons">
                    <a href="#" class="edit-btn" data-index="${start + index}"><i class="fas fa-pen success"></i></a>
                    <a href="#" class="delete-btn" data-index="${start + index}"><i class="fas fa-trash" style="color: red;"></i></a>
                </td>
            `;
            wrapper.appendChild(row);
        });


    }

    function setupPagination(items, wrapper, rowsPerPage) {
        wrapper.innerHTML = "";

        let pageCount = Math.ceil(items.length / rowsPerPage);

        const prevItem = document.createElement("li");
        prevItem.classList.add("page-item");
        if (currentPage === 1) prevItem.classList.add("disabled");

        const prevLink = document.createElement("a");
        prevLink.classList.add("page-link", "modern-btn");
        prevLink.href = "#";
        prevLink.innerHTML = "‹ Prev";
        prevLink.onclick = function (e) {
            e.preventDefault();
            if (currentPage > 1) {
                currentPage--;
                update();
            }
        };
        prevItem.appendChild(prevLink);
        wrapper.appendChild(prevItem);

        for (let i = 1; i <= pageCount; i++) {
            const pageItem = document.createElement("li");
            pageItem.classList.add("page-item");
            if (currentPage === i) pageItem.classList.add("active");

            const pageLink = document.createElement("a");
            pageLink.classList.add("page-link", "modern-btn");
            pageLink.href = "#";
            pageLink.innerHTML = i;
            pageLink.onclick = function (e) {
                e.preventDefault();
                currentPage = i;
                update();
            };

            pageItem.appendChild(pageLink);
            wrapper.appendChild(pageItem);
        }

        const nextItem = document.createElement("li");
        nextItem.classList.add("page-item");
        if (currentPage === pageCount) nextItem.classList.add("disabled");

        const nextLink = document.createElement("a");
        nextLink.classList.add("page-link", "modern-btn");
        nextLink.href = "#";
        nextLink.innerHTML = "Next ›";
        nextLink.onclick = function (e) {
            e.preventDefault();
            if (currentPage < pageCount) {
                currentPage++;
                update();
            }
        };
        nextItem.appendChild(nextLink);
        wrapper.appendChild(nextItem);
    }

    function setupEditButtons() {
        const editButtons = document.querySelectorAll(".edit-btn");

        editButtons.forEach(btn => {
            btn.addEventListener("click", function (e) {
                e.preventDefault();
                const index = this.getAttribute("data-index");
                const row = this.closest("tr");
                console.log(row);
                console.log(index);
                const availableCell = row.querySelector(".available-cell");
                const priceCell = row.querySelector(".price-cell");
                const icon = this.querySelector("i");

                if (icon.classList.contains("fa-pen")) {
                    // Switch to edit mode
                    availableCell.innerHTML = `<input type="number" value="${seller_product[index].availible}" class="form-control form-control-sm" style="width: 70px; padding: 2px 5px; border:1px solid black; margin:0px 5px;">`;
                    priceCell.innerHTML = `<input type="number" value="${seller_product[index].price}" class="form-control form-control-sm" style="width: 70px; padding: 2px 5px; border:1px solid black; margin:0px 5px;">`;
                    icon.classList.remove("fa-pen");
                    icon.classList.add("fa-save");
                } else {
                    // Save changes
                    const newAvailable = availableCell.querySelector("input").value;
                    const newPrice = priceCell.querySelector("input").value;
                    products.forEach((product) => {
                        if (seller_product[index].id == product.id) {
                            product.availible = parseInt(newAvailable);
                            product.price = parseFloat(newPrice);
                        }
                    });
                    console.log(seller_product[index]);
                    // Update localStorage
                    localStorage.setItem("products", JSON.stringify(products));

                    // Switch back to normal view
                    availableCell.textContent = newAvailable;
                    priceCell.textContent = newPrice;
                    icon.classList.remove("fa-save");
                    icon.classList.add("fa-pen");

                    update();
                }
            });
        });
    }

    function setupDeleteButtons() {
        const deleteButtons = document.querySelectorAll(".delete-btn");
    
        deleteButtons.forEach(btn => {
            btn.addEventListener("click", function (e) {
                e.preventDefault();
                const index = this.getAttribute("data-index");
    
                // Confirm delete (optional)
                if (confirm("Are you sure you want to delete this product?")) {
                    // Remove from array
                    products.splice(index, 1);
    
                    // Update localStorage
                    localStorage.setItem("products", JSON.stringify(products));
    
                    // Refresh table and pagination
                    update();
                }
            });
        });
    }

    function update() {
        displayProducts(seller_product, tbody, rowsPerPage, currentPage);
        setupPagination(seller_product, pagination, rowsPerPage);
        setupEditButtons();
        setupDeleteButtons();
    }

    update();


});
