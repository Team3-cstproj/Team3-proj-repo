const sideMenue = document.querySelector("aside");
const menuBtn = document.querySelector("#menu_bar");
const closeBtn = document.querySelector("#close_btn");
const products = JSON.parse(localStorage.getItem("products")) || [];
const info = JSON.parse(sessionStorage.getItem("currentUser")) || [];

console.log(info);
const themToggler = document.querySelector(".theme-toggler");

menuBtn.addEventListener("click", () => {
    sideMenue.style.display = "block";
})
closeBtn.addEventListener("click", () => {
    sideMenue.style.display = "none";
})



function animateCircleSales(percentage) {
    const circle = document.querySelector(".sales svg circle");
    console.log(circle);
    console.log(circle.r.baseVal.value);
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

    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = circumference;

    const offset = circumference - (percentage / 100) * circumference;
    circle.style.strokeDashoffset = offset;

    if(percentage<0) circle.style.stroke = '#ff4d4f';
    else circle.style.stroke = '#41f1b6'
    
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

        animateValue(totalSalesElement, currentSales, totalSales, 1000);
    }
    if (totalExpenses) {
        const currentSales = parseInt(totalExpenses.textContent.replace(/\$|,/g, "")) || 0;
        animateValue(totalExpenses, currentSales, totalTarget*7/10, 1000);
    }
    if (totalIncome) {
        const currentSales = parseInt(totalIncome.textContent.replace(/\$|,/g, "")) || 0;
        animateValue(totalIncome, currentSales, totalSales - totalTarget*7/10, 1000);
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

document.addEventListener("DOMContentLoaded", calculateTotalSales);
