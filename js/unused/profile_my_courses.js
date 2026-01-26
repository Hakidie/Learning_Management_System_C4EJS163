import { courses } from '../js/courses.js';
import { setupToolbar } from '../js/profile_toolbar.js';
import { setupPagination } from '../js/profile_pagination.js';

let filteredCourses = [...courses];
let currentPage = 1;
const itemsPerPage = 6; // Set as needed

async function init() {
    await setupToolbar({
        placeholderId: 'toolbar-placeholder',
        sortOptions: [
            { label: 'Newest', value: 'newest' },
            { label: 'Oldest', value: 'oldest' },
            { label: 'Popular', value: 'popular' }
        ],
        filterOptions: [
            { label: 'Show All', value: 'all' },
            { label: 'High Rating (>1000)', value: 'high' },
            { label: 'Low Rating (<1000)', value: 'low' }
        ],
        onAction: (state) => handleToolbarAction(state)
    });

    renderGrid();
}

function handleToolbarAction(state) {
    // 1. Filter
    filteredCourses = courses.filter(c => {
        const matchesSearch = c.title.toLowerCase().includes(state.search);
        let matchesFilter = true;
        if (state.filter === 'high') matchesFilter = c.ratings > 1000;
        if (state.filter === 'low') matchesFilter = c.ratings <= 1000;
        return matchesSearch && matchesFilter;
    });

    // 2. Sort
    filteredCourses.sort((a, b) => {
        if (state.sort === 'newest') return new Date(b.joinedDate) - new Date(a.joinedDate);
        if (state.sort === 'oldest') return new Date(a.joinedDate) - new Date(b.joinedDate);
        if (state.sort === 'popular') return b.popularity - a.popularity;
        return 0;
    });

    currentPage = 1; // Reset to page 1 on search/sort/filter
    renderGrid();
}

function renderGrid() {
    const grid = document.getElementById('course-grid');
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedItems = filteredCourses.slice(start, end);

    grid.innerHTML = paginatedItems.map(c => `
        <div class="card">
            <div class="picture"><img src="${c.img}" alt="${c.title}"></div>
            <h3>${c.title}</h3>
            <p>By ${c.instructor}</p>
            <div class="progress-bar"><div class="progress" style="width: 40%"></div></div>
            <div class="rating">
                <img src="../assets/icons/starts-rating.png" alt="star">
                <p>(${c.ratings} Ratings)</p>
            </div>
        </div>
    `).join('');

    // Update Pagination
    const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
    setupPagination(
        document.getElementById('pagination-placeholder'),
        currentPage,
        totalPages,
        (newPage) => {
            currentPage = newPage;
            renderGrid();
        }
    );
}

init();