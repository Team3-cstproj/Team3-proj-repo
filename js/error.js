const backHome = document.getElementById("home-button");

backHome.addEventListener("click", function() {
    const user = JSON.parse(sessionStorage.getItem("currentUser"));
    if (user) {
        const userRole = user.role;
        if (userRole === "admin") {
            window.location.href = "admin.html"; 
        }
        else if (userRole === "seller") {
            window.location.href = "seller.html"; 
        } else if (userRole === "user") {
            window.location.href = "index.html"; 
        } 
    } else {
        window.location.href = "index.html";
    }
     
});