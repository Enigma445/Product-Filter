let products = {
    data: [
        {
            productName: "Regular Top",
            category: "Topwear",
            price: "30",
            image: "top1.jpg",
        },
        {
            productName: "Designer Trouser",
            category: "Bottomwear",
            price: "640",
            image: "trouser.avif",
        },
        {
            productName: "Smart Watch",
            category: "Watch",
            price: "60",
            image: "watch.jpg",
        },
        {
            productName: "Basic knitted Top",
            category: "Topwear",
            price: "499",
            image: "top2.jpg",
        },
        {
            productName: "Black leather Jacket",
            category: "Jacket",
            price: "20",
            image: "jacket.webp",
        },
        {
            productName: "Cooprate Trouser",
            category: "Bottomwear",
            price: "60",
            image: "trouser1.jpg",
        },
        {
            productName: "Black men's Jacket",
            category: "Jacket",
            price: "50",
            image: "jacket1.webp",
        },
        {
            productName: "Short Skirt",
            category: "Bottomwear",
            price: "62",
            image: "skirt.avif",
        },
        {
            productName: "Smart Watch",
            category: "Watch",
            price: "160",
            image: "smartwatch.jpg",
        },
    ],
};

function createProductCard(product) {
    return `
        <div class="product-item" data-category="${product.category}">
            <div class="image-container">
                <img src="${product.image}" alt="${product.productName}" class="product-image">
            </div>
            <h3>${product.productName}</h3>
            <p>Price: $${product.price}</p>
        </div>
    `;
}

function displayProducts(filter = "all") {
    const productContainer = document.getElementById('productContainer');
    productContainer.innerHTML = "";

    products.data.forEach(product => {
        if (filter === "all" || product.category.toLowerCase() === filter.toLowerCase() ||
            product.productName.toLowerCase().includes(filter.toLowerCase())) {
            productContainer.innerHTML += createProductCard(product);
        }
    });

    const productImages = document.querySelectorAll('.product-image');
    productImages.forEach(image => {
        image.addEventListener('mouseover', () => {
            image.classList.add('hovered');
        });

        image.addEventListener('mouseout', () => {
            image.classList.remove('hovered');
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    displayProducts();

    const buttons = document.querySelectorAll('.button-value');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const category = button.getAttribute('data-category');
            displayProducts(category);
        });
    });

    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search');


    function handleSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        const matchedProduct = products.data.find(product => product.productName.toLowerCase().includes(searchTerm));
        if (matchedProduct) {
            const categoryButton = document.querySelector(`.button-value[data-category="${matchedProduct.category}"]`);
            if (categoryButton) {
                buttons.forEach(btn => btn.classList.remove('active'));
                categoryButton.classList.add('active');
            }
        }
        displayProducts(searchTerm);
        searchInput.value = "";
    }

    
    searchButton.addEventListener('click', handleSearch);


    searchInput.addEventListener('keyup', event => {
        if (event.keyCode === 13) {
            handleSearch();
        }
    });
});
