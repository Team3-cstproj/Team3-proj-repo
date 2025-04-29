const backHome = document.getElementById("home-button");

backHome.addEventListener("click", function() {
    const user = JSON.parse(sessionStorage.getItem("currentUser"));
    if (user) {
        const userRole = user.role;
        if (userRole === "admin") {
            window.location.href = "admin.html"; // Redirect to admin page
        }
        else if (userRole === "seller") {
            window.location.href = "seller.html"; // Redirect to seller page
        } else if (userRole === "user") {
            window.location.href = "index.html"; // Redirect to user page
        } 
    } else {
        window.location.href = "index.html";
    }
     // Redirect to the home page
});