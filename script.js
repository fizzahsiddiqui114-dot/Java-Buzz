
/* =========================================
   JAVA BUZZ - COMPLETE JAVASCRIPT
========================================= */


/* =========================================
   1. ORDER FUNCTION
========================================= */

function orderNow(coffeeName) {
    alert(`Thank you for ordering ${coffeeName}! ☕`);
}


/* =========================================
   2. MAP FUNCTIONALITY
========================================= */

const mapElement = document.getElementById("map");

if (mapElement && typeof L !== "undefined") {

    const map = L.map("map").setView([24.8607, 67.0011], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors"
    }).addTo(map);

    L.marker([24.8607, 67.0011])
        .addTo(map)
        .bindPopup("Java Buzz Coffee Shop")
        .openPopup();
}


/* =========================================
   3. MENU PRODUCTS
========================================= */

const products = [

    {
        id: 1,
        name: "Espresso",
        category: "Hot Coffee",
        price: 3.50,
        description: "Rich, bold and perfectly brewed espresso.",
        image: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?auto=format&fit=crop&w=700&q=85"
    },

    {
        id: 2,
        name: "Cappuccino",
        category: "Hot Coffee",
        price: 4.50,
        description: "Smooth espresso topped with creamy milk foam.",
        image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=700&q=85"
    },

    {
        id: 3,
        name: "Classic Latte",
        category: "Hot Coffee",
        price: 4.75,
        description: "A comforting blend of espresso and steamed milk.",
        image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=700&q=85"
    },

    {
        id: 4,
        name: "Americano",
        category: "Hot Coffee",
        price: 3.75,
        description: "Classic espresso softened with hot water.",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=700&q=85"
    },

    {
        id: 5,
        name: "Caramel Macchiato",
        category: "Special Drinks",
        price: 5.50,
        description: "Espresso, silky milk and sweet caramel drizzle.",
        image: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&w=700&q=85"
    },

    {
        id: 6,
        name: "Mocha Delight",
        category: "Special Drinks",
        price: 5.25,
        description: "A delicious combination of chocolate and coffee.",
        image: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&w=700&q=85"
    },

    {
        id: 7,
        name: "Iced Latte",
        category: "Cold Coffee",
        price: 4.75,
        description: "Chilled espresso blended with refreshing milk.",
        image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=700&q=85"
    },

    {
        id: 8,
        name: "Cold Brew",
        category: "Cold Coffee",
        price: 5.00,
        description: "Slow-steeped coffee with a smooth refreshing taste.",
        image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=700&q=85"
    },

    {
        id: 9,
        name: "Vanilla Frappe",
        category: "Cold Coffee",
        price: 5.50,
        description: "Creamy iced coffee with a touch of vanilla.",
        image: "https://images.unsplash.com/photo-1462917882517-e150004895fa?auto=format&fit=crop&w=700&q=85"
    },

    {
        id: 10,
        name: "Chocolate Brownie",
        category: "Desserts",
        price: 3.50,
        description: "Rich chocolate brownie, perfect with your coffee.",
        image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=700&q=85"
    },

    {
        id: 11,
        name: "Cheesecake",
        category: "Desserts",
        price: 4.50,
        description: "Creamy cheesecake with a buttery biscuit base.",
        image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=700&q=85"
    },

    {
        id: 12,
        name: "Chocolate Cake",
        category: "Desserts",
        price: 4.00,
        description: "Soft chocolate cake for your sweet cravings.",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=700&q=85"
    }

];


/* =========================================
   4. GLOBAL SCROLL ANIMATIONS
========================================= */

let revealObserver = null;

function initializeAnimations() {

    const animatedElements = document.querySelectorAll(
        ".menu-banner, .menu-filters, .menu-page, " +
        ".location-page, .timing-section, " +
        ".blog-section, .tips-section, " +
        ".card, .offer-card, .tip-card, .timing-card"
    );

    if ("IntersectionObserver" in window) {

        revealObserver = new IntersectionObserver((entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        }, {
            threshold: 0.12
        });

    }

    animatedElements.forEach(element => {

        // Existing CSS animations ko override nahi karna
        if (
            element.classList.contains("animate-fade-in") ||
            element.classList.contains("animate-slide-up") ||
            element.classList.contains("animate-card")
        ) {
            return;
        }

        element.classList.add("reveal");

        observeElement(element);

    });

}


function observeElement(element) {

    if (!element) return;

    if (revealObserver) {

        revealObserver.observe(element);

    } else {

        element.classList.add("visible");

    }

}


/* =========================================
   5. MENU VARIABLES
========================================= */

const productGrid = document.getElementById("product-grid");

const searchInput = document.getElementById("search-input");

const filterButtons = document.querySelectorAll(".filter-btn");

const cartCount = document.getElementById("cart-count");

let selectedCategory = "all";

let cartItems = 0;

let cartNumber = null;


/* =========================================
   6. CART COUNTER
========================================= */

if (cartCount) {

    cartNumber = cartCount.querySelector(".cart-count-number");

    if (!cartNumber) {

        cartNumber = document.createElement("span");

        cartNumber.className = "cart-count-number";

        cartCount.appendChild(cartNumber);

    }

    updateCartCounter();

}


function updateCartCounter() {

    if (!cartCount || !cartNumber) return;

    cartNumber.textContent = cartItems;

    cartCount.setAttribute(
        "aria-label",
        `Shopping cart: ${cartItems} items`
    );

    cartCount.title = `Shopping cart: ${cartItems} items`;

}


/* =========================================
   7. ADD TO CART
========================================= */

function addToCart(productId) {

    const product = products.find(item => item.id === productId);

    if (!product) return;

    cartItems++;

    updateCartCounter();

    alert(`${product.name} added to your cart! ☕`);

}


/* =========================================
   8. DISPLAY MENU PRODUCTS
========================================= */

function displayProducts(items) {

    if (!productGrid) return;

    productGrid.innerHTML = "";

    if (items.length === 0) {

        const message = document.createElement("p");

        message.textContent = "No products found. Try another search.";

        message.style.gridColumn = "1 / -1";

        message.style.textAlign = "center";

        message.style.padding = "35px";

        message.style.fontSize = "18px";

        productGrid.appendChild(message);

        return;

    }

    items.forEach((product, index) => {

        const card = document.createElement("article");

        card.className = "product-card reveal";

        card.style.transitionDelay = `${index * 0.08}s`;

        const image = document.createElement("img");

        image.className = "product-image";

        image.src = product.image;

        image.alt = product.name;

        image.loading = "lazy";

        const info = document.createElement("div");

        info.className = "product-info";

        const category = document.createElement("p");

        category.className = "product-category";

        category.textContent = product.category;

        const title = document.createElement("h3");

        title.textContent = product.name;

        const description = document.createElement("p");

        description.textContent = product.description;

        const price = document.createElement("span");

        price.className = "product-price";

        price.textContent = `$${product.price.toFixed(2)}`;

        const button = document.createElement("button");

        button.className = "add-cart-btn";

        button.textContent = "Add to Cart";

        button.addEventListener("click", () => {

            addToCart(product.id);

        });

        info.appendChild(category);

        info.appendChild(title);

        info.appendChild(description);

        info.appendChild(price);

        info.appendChild(button);

        card.appendChild(image);

        card.appendChild(info);

        productGrid.appendChild(card);

        observeElement(card);

    });

}


/* =========================================
   9. SEARCH & CATEGORY FILTER
========================================= */

function filterProducts() {

    if (!productGrid) return;

    const searchValue = searchInput
        ? searchInput.value.toLowerCase().trim()
        : "";

    const filteredProducts = products.filter(product => {

        const matchesCategory =
            selectedCategory === "all" ||
            product.category === selectedCategory;

        const matchesSearch =
            product.name.toLowerCase().includes(searchValue) ||
            product.category.toLowerCase().includes(searchValue) ||
            product.description.toLowerCase().includes(searchValue);

        return matchesCategory && matchesSearch;

    });

    displayProducts(filteredProducts);

}


/* Search Event */

if (searchInput) {

    searchInput.addEventListener("input", filterProducts);

}


/* Category Filter Events */

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {

            btn.classList.remove("active");

        });

        button.classList.add("active");

        selectedCategory = button.dataset.category || "all";

        filterProducts();

    });

});


/* =========================================
   10. INITIAL MENU DISPLAY
========================================= */

if (productGrid) {

    filterProducts();

}


/* =========================================
   11. BLOG FUNCTIONALITY
========================================= */

const blogContainer = document.getElementById("blog-container");


function renderBlogs(blogs) {

    if (!blogContainer) return;

    blogContainer.innerHTML = "";

    blogs.forEach((blog, index) => {

        const card = document.createElement("article");

        card.className = "blog-card reveal";

        card.style.transitionDelay = `${index * 0.1}s`;

        const image = document.createElement("img");

        image.src = blog.image;

        image.alt = blog.title;

        image.loading = "lazy";

        const content = document.createElement("div");

        content.className = "blog-content";

        const category = document.createElement("span");

        category.className = "blog-category";

        category.textContent = blog.category;

        const date = document.createElement("small");

        date.className = "blog-date";

        date.textContent = blog.date;

        const heading = document.createElement("h3");

        heading.textContent = blog.title;

        const paragraph = document.createElement("p");

        paragraph.textContent = blog.content;

        const button = document.createElement("button");

        button.className = "read-more-btn";

        button.textContent = "Read More";

        button.setAttribute("aria-expanded", "false");

        button.addEventListener("click", () => {

            const isExpanded = card.classList.toggle("expanded");

            paragraph.textContent = isExpanded
                ? (blog.fullContent || blog.content)
                : blog.content;

            button.textContent = isExpanded
                ? "Read Less"
                : "Read More";

            button.setAttribute(
                "aria-expanded",
                String(isExpanded)
            );

        });

        content.appendChild(category);

        content.appendChild(date);

        content.appendChild(heading);

        content.appendChild(paragraph);

        content.appendChild(button);

        card.appendChild(image);

        card.appendChild(content);

        blogContainer.appendChild(card);

        observeElement(card);

    });

}


/* Load Blogs JSON */

if (blogContainer) {

    fetch("./blogs.json")

        .then(response => {

            if (!response.ok) {

                throw new Error("Blogs file not found");

            }

            return response.json();

        })

        .then(data => {

            if (!Array.isArray(data)) {

                throw new Error("Invalid blog data");

            }

            renderBlogs(data);

        })

        .catch(error => {

            console.error("Blogs loading error:", error);

            blogContainer.textContent =
                "Unable to load blogs. Please try again later.";

        });

}


/* =========================================
   12. INITIALIZE ANIMATIONS
========================================= */

initializeAnimations();
