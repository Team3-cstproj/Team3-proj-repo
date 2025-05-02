
sessionStorage.setItem("flag", 1);
const allowedRoles = ['seller']; // Customize this for each page
      
const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

if (!currentUser || !allowedRoles.includes(currentUser.role)) {
    window.location.href = 'error.html';
}
document.addEventListener("DOMContentLoaded", function () {
    const sideMenue = document.querySelector("aside");
    const menuBtn = document.querySelector("#menu_bar");
    const closeBtn = document.querySelector("#close_btn");
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const info = JSON.parse(sessionStorage.getItem("currentUser")) || [];
    const tbody = document.querySelector("table tbody");
    const pagination = document.querySelector(".pagination");
    document.getElementById("clearUser").addEventListener("click", function () {
    sessionStorage.clear();
    })
    document.getElementById("seller_name").textContent = info.username;
    const rowsPerPage = 5;
    let seller_product = products.filter(product => product.sellerId == info.id);
    let seller_order = orders.filter(order => order.sellerId == info.id);
    console.log(seller_order);
    console.log(seller_product);
    let currentPage=1;
    const themToggler = document.querySelector(".theme-toggler");
    let flag = JSON.parse(sessionStorage.getItem("flag"));
    if(flag % 2 == 0){
        document.body.classList.toggle("dark-theme-variables");
        themToggler.querySelector("span:nth-child(1)").classList.toggle("active");
        themToggler.querySelector("span:nth-child(2)").classList.toggle("active");
    }
    themToggler.addEventListener("click", () => {
        document.body.classList.toggle("dark-theme-variables");
        themToggler.querySelector("span:nth-child(1)").classList.toggle("active");
        themToggler.querySelector("span:nth-child(2)").classList.toggle("active");
        sessionStorage.setItem("flag", ++flag);

    });
    menuBtn.addEventListener("click", () => {
        sideMenue.style.display = "block";
    })
    closeBtn.addEventListener("click", () => {
        sideMenue.style.display = "none";
    })
    
    function animateCircleSales(percentage) {
        const circle = document.querySelector(".sales svg circle");
        const radius = circle.r.baseVal.value;
        const circumference = 2 * Math.PI * radius;
    
        circle.style.strokeDasharray = `${circumference} ${circumference}`;
        circle.style.strokeDashoffset = circumference;
    
        const offset = circumference - (percentage / 100) * circumference;
        circle.style.strokeDashoffset = offset;
    }
    
    function animateCircleIncome(percentage) {
        const circle = document.querySelector(".income svg circle");
        const radius = circle.r.baseVal.value;
        const circumference = 2 * Math.PI * radius;
        const totalIncome =   document.querySelector(".income .left h1");

        circle.style.strokeDasharray = `${circumference} ${circumference}`;
        circle.style.strokeDashoffset = circumference;
    
        const offset = circumference - (percentage / 100) * circumference;
        circle.style.strokeDashoffset = offset;
    
        if(percentage<0) circle.style.stroke = '#ff4d4f';
        else {
            circle.style.stroke = '#41f1b6';
            totalIncome.style.color = "#41f1b6";
        }
        
    }
    
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            element.textContent = `$${Math.floor(progress * (end - start) + start).toLocaleString()}`;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
    
    function calculateTotalSales() {
        let totalSales = 0;
        let totalTarget = 0; // Set your target sales goal here
    
        products.forEach(product => {
            if(product.sellerId != info.id) return;
            totalSales  += (product.price * product.sold);
            totalTarget += (product.price * (product.sold+product.availible));
    
        });
    
        const totalSalesElement = document.querySelector(".sales .left h1");
        const totalExpenses = document.querySelector(".expenses .left h1");
        const totalIncome =   document.querySelector(".income .left h1");
    
        if (totalSalesElement) {
            const currentSales = parseInt(totalSalesElement.textContent.replace(/\$|,/g, "")) || 0;
    
            animateValue(totalSalesElement, 0, totalSales, 1000);
        }
        if (totalExpenses) {
            const currentSales = parseInt(totalExpenses.textContent.replace(/\$|,/g, "")) || 0;
            animateValue(totalExpenses, 0, totalTarget*7/10, 1000);
        }
        if (totalIncome) {
            const currentSales = parseInt(totalIncome.textContent.replace(/\$|,/g, "")) || 0;
            animateValue(totalIncome, 0, totalSales - totalTarget*7/10, 1000);
            if((totalSales / (totalTarget*0.7)-1)<0) totalIncome.style.color = "#ff4d4f";
            else totalIncome.style.color = "#ff4d4f"
        }
        let percentageSales ;
        let percentageIncome;
        // Calculate and animate percentage
        if(totalTarget!=0){
            percentageSales = Math.min((totalSales / totalTarget) * 100, 100); // Max 100%
            percentageIncome =(totalSales / (totalTarget*0.7)-1) * 100; 
        } // Avoid division by zero
        else {
            percentageSales = 0;
            percentageIncome = 0;
        }
        
    
        animateCircleSales(percentageSales);
        animateCircleIncome(percentageIncome);
    
        // Also update the number inside the circle
        const numberElement_Sales = document.querySelector(".sales .number");
        if (numberElement_Sales) {
            numberElement_Sales.textContent = `${Math.floor(percentageSales)}%`;
        }
        const animateCircle_Income = document.querySelector(".income .number");
        if (animateCircle_Income) {
            animateCircle_Income.textContent = `${Math.floor(percentageIncome)}%`;
        }
    }
    

    function displayOrders(orders, wrapper, rowsPerPage, page) {
        wrapper.innerHTML = "";
        page--;
    
        orders.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
    
        let start = page * rowsPerPage;
        let end = start + rowsPerPage;
        let paginatedItems = orders.slice(start, end);
    
        paginatedItems.forEach((order) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${order.id}</td>
                <td>${order.userName}</td>
                <td>${order.totalPrice}</td>
                <td><a class="primary" href="receipt.html?ids=${[+order.id]}"><span class="primary dtails-link">Details</span></a></td>
            `;
            wrapper.appendChild(row);
        });
    }
    ملاحظات:

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


    
    function update() {
        calculateTotalSales();
        displayOrders(seller_order, tbody, rowsPerPage, currentPage);
        setupPagination(seller_order, pagination, rowsPerPage);
    }







    update();
    document.querySelectorAll(".details-btn").forEach(button => {
        button.addEventListener("click", function () {
          // Find the closest row
          const row = this.closest("tr");
          // Get the first cell's text content (assumed to be ID)
          const orderid = row.cells[0].textContent.trim();
          window.location.href = `receipt.html?ids=${[+orderid]}`;
        });
    });

  

});
    