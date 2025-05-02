const allowedRoles = ['seller']; // Customize this for each page
      
const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

if (!currentUser || !allowedRoles.includes(currentUser.role)) {
  window.location.href = 'error.html';
}



document.addEventListener("DOMContentLoaded", function () {
    const productForm = document.getElementById("productForm");
    const productImageInput = document.getElementById("productImage");
    const uploadArea = document.getElementById("uploadArea");
    const imagePreview = document.getElementById("imagePreview");
    const info = JSON.parse(sessionStorage.getItem("currentUser")) || [];
    const themToggler = document.querySelector(".theme-toggler");
    const sideMenue = document.querySelector("aside");
    const menuBtn = document.querySelector("#menu_bar");
    const closeBtn = document.querySelector("#close_btn");
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
    });
    let imagePath; // Initialize imagePath variable
    document.getElementById("clearUser").addEventListener("click", function () {
        sessionStorage.clear();
        })
    let products = JSON.parse(localStorage.getItem("products")) || [];
    document.getElementById("seller_name").textContent = info.username;
    menuBtn.addEventListener("click", () => {
        sideMenue.style.display = "block";
    })
    closeBtn.addEventListener("click", () => {
        sideMenue.style.display = "none";
    })

    uploadArea.addEventListener("click", function () {
        productImageInput.click();
    });

    productImageInput.addEventListener("change", function (e) {
        const file = this.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                imagePath = e.target.result; // Store the image path in the variable

            imagePreview.innerHTML = `<img src="${imagePath}" alt="Product Image" style="max-width: 100%; height: auto; margin-top: 10px; border-radius: 8px;">`;
            };
            reader.readAsDataURL(file);
            document.getElementById("uploadArea").style.display = "none"; // Hide the upload area after selecting an image
        }
    });

    productForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const productName = document.getElementById("productName").value.trim();
        const price = parseFloat(document.getElementById("price").value);
        const pieces = parseInt(document.getElementById("pieces").value);
        const category = document.getElementById("category").value;
        const description = document.getElementById("description").value.trim();
        const productImage = productImageInput.files[0];
        const sellerId = info.id;
        const review = [{
            userId: 501,
            username: "user1",
            rating: 5,
            comment: "Perfect fit and very comfortable material. Highly recommend!",
            date: "2023-06-10"
          },
          {
            userId: 503,
            username: "user3",
            rating: 4,
            comment: "Great quality but runs slightly large",
            date: "2023-07-15"
          } ];
        if (!productImage) {
            alert("Please upload an image.");
            return;
        }

        

        const newProduct = {
            id: generateUniqueId(),
            name: productName,
            category: category,
            sold: 0, 
            availible: pieces,
            price: price,
            img: imagePath,
            description: description,
            sellerId: sellerId,
            reviews: review
        };

        products.push(newProduct);

        localStorage.setItem("products", JSON.stringify(products));

        productForm.reset();
        imagePreview.innerHTML = ""; // Clear preview



    

        // Here you can add your logic to handle product upload if needed

        Swal.fire({
            icon: 'success',
            title: 'Product Added!',
            text: 'Your product has been successfully added.',
            confirmButtonColor: '#3085d6',
            timer: 3000,
            showConfirmButton: false
        });

        // Optionally reset the form
        this.reset();
        document.getElementById("uploadArea").style.display = "block"; // Hide the upload area after selecting an image



    });





    function generateUniqueId() {
        if (products.length === 0) return 1; // If no products, start from 1

        // Find the maximum id
        const maxId = products.reduce((max, product) => Math.max(max, product.id), 0);
        return maxId + 1;    }


});
