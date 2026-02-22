function orderNow() {
    alert("Redirecting to order page...");
}

// Leaflet Map
var map = L.map('map').setView([24.8607, 67.0011], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

L.marker([24.8607, 67.0011]).addTo(map)
    .bindPopup("Java Buzz Coffee Shop")
    .openPopup();

// Load Blogs
fetch('blogs.json')
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('blog-container');
        data.forEach(blog => {
            container.innerHTML += `
                <div class="blog-card">
                    <h3>${blog.title}</h3>
                    <p>${blog.content}</p>
                </div>
            `;
        });
    });