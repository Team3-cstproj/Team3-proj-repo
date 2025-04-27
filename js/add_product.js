
document.addEventListener("DOMContentLoaded", function () {
    const productForm = document.getElementById("productForm");
    const productImageInput = document.getElementById("productImage");
    const uploadArea = document.getElementById("uploadArea");
    const imagePreview = document.getElementById("imagePreview");

    let products = JSON.parse(localStorage.getItem("products")) || [];


    uploadArea.addEventListener("click", function () {
        productImageInput.click();
    });

    productImageInput.addEventListener("change", function () {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
            imagePreview.innerHTML = `<img src="${e.target.result}" alt="Product Image" style="max-width: 100%; height: auto; margin-top: 10px; border-radius: 8px;">`;
            };
            reader.readAsDataURL(file);
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
        const sellerId = 302;

        if (!productImage) {
            alert("Please upload an image.");
            return;
        }

        // Save only the file name (not the image itself)
        const imagePath = productImage.name; 

        const newProduct = {
            id: generateUniqueId(),
            name: productName,
            category: category,
            sold: 0, 
            availible: pieces,
            price: price,
            status: pieces > 0 ? "InStock" : "OutOfStock",
            image: imagePath,
            description: description,
            sellerId: sellerId 
        };

        products.push(newProduct);

        localStorage.setItem("products", JSON.stringify(products));

        productForm.reset();
        imagePreview.innerHTML = ""; // Clear preview
    });

    function generateUniqueId() {
        if (products.length === 0) return 1; // If no products, start from 1

        // Find the maximum id
        const maxId = products.reduce((max, product) => Math.max(max, product.id), 0);
        return maxId + 1;    }
});
