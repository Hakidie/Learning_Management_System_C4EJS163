import { teachers } from '../js/teachers.js';
import { setupToolbar } from '../js/profile_toolbar.js';
import { setupPagination } from '../js/profile_pagination.js';

let filteredTeachers = [...teachers];
let currentPage = 1;
const itemsPerPage = 8; // Set as needed

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
    filteredTeachers = teachers.filter(t => {
        const matchesSearch = t.name.toLowerCase().includes(state.search);
        let matchesFilter = true;
        if (state.filter === 'high') matchesFilter = t.ratings > 1000;
        if (state.filter === 'low') matchesFilter = t.ratings <= 1000;
        return matchesSearch && matchesFilter;
    });

    // 2. Sort
    filteredTeachers.sort((a, b) => {
        if (state.sort === 'newest') return new Date(b.joinedDate) - new Date(a.joinedDate);
        if (state.sort === 'oldest') return new Date(a.joinedDate) - new Date(b.joinedDate);
        if (state.sort === 'popular') return b.popularity - a.popularity;
        return 0;
    });

    currentPage = 1; // Reset to page 1 on search/sort/filter
    renderGrid();
}

function renderGrid() {
    const grid = document.getElementById('teacher-grid');
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedItems = filteredTeachers.slice(start, end);

    grid.innerHTML = paginatedItems.map(t => `
        <div class="card">
            <div class="picture">
                <img src="${t.img}" alt="${t.name}">
                <h3>${t.name}</h3>
                <p>${t.role}</p>
            </div>
            <button class="send-message">
                Send Message
                <img src="../assets/icons/mail.png">
            </button>
        </div>
    `).join('');

    // Update Pagination
    const totalPages = Math.ceil(filteredTeachers.length / itemsPerPage);
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