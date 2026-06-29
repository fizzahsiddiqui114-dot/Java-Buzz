// =========================
// ORDER BUTTON
// =========================

function orderNow(coffeeName) {
    alert(`Thank you for ordering ${coffeeName}! ☕`);
}

// =========================
// MAP
// =========================

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

// =========================
// BLOGS
// =========================

const blogContainer = document.getElementById("blog-container");

if (blogContainer) {

    fetch("blogs.json")
        .then(response => response.json())
        .then(data => {

            data.forEach(blog => {

                blogContainer.innerHTML += `
                    <div class="blog-card">
                        <h3>${blog.title}</h3>
                        <p>${blog.content}</p>
                    </div>
                `;

            });

        })
        .catch(error => {
            console.error("Error loading blogs:", error);
        });
}