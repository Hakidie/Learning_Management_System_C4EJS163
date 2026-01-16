// Function load nội dung từ file HTML khác
function loadHTML(file, elementId) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
        });
}

// Load header.html vào #header-placeholder
loadHTML('header-h.html', 'header-placeholder');

// Load footer.html vào #footer-placeholder
loadHTML('footer-h.html', 'footer-placeholder');

// Load sidebar for profiles pages
loadHTML('profile_sidebar.html', 'profile-sidebar-placeholder');

// Load toolbar for profiles pages
loadHTML('profile_toolbar.html', 'toolbar-placeholder');

// Load pagination for profiles page contents
loadHTML('profile_pagination.html', 'pagination-placeholder');



// Scroll button for About Us in homepage
const container = document.getElementById('reviews-container');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');

// Calculate how much to scroll: Card width (432px) + Gap (16px)
const scrollAmount = 448; 

nextBtn.addEventListener('click', () => {
    container.scrollBy({
        left: scrollAmount,
        behavior: 'smooth' // This makes the sliding look nice
    });
});

prevBtn.addEventListener('click', () => {
    container.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
    });
});