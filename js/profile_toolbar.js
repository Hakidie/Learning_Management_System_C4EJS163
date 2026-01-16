/**
 * @param {Object} config - Configuration object
 * @param {string} config.placeholderId - ID where toolbar should be injected
 * @param {Array} config.sortOptions - Array of { label, value }
 * @param {Array} config.filterOptions - Array of { label, value }
 * @param {Function} config.onAction - Callback when search/sort/filter changes
 */
export async function setupToolbar(config) {
    const container = document.getElementById(config.placeholderId);
    if (!container) return;

    // 1. Fetch and Load the Toolbar HTML
    
    const response = await fetch('../pages/profile_toolbar.html'); 
    const html = await response.text();
    container.innerHTML = html;

    // --- DOM Elements ---
    const searchInput = container.querySelector('#search-input');
    const sortOptionsContainer = container.querySelector('#sort-options');
    const filterOptionsContainer = container.querySelector('#filter-options');
    const currentSortText = container.querySelector('#current-sort');
    const currentFilterText = container.querySelector('#current-filter');
    
    const sortBtn = container.querySelector('.sort');
    const filterBtn = container.querySelector('.filter');
    const sortParent = container.querySelector('.dropdown-sort');
    const filterParent = container.querySelector('.dropdown-filter');

    // --- Internal State ---
    let state = {
        search: '',
        sort: config.sortOptions[0].value,
        filter: 'all'
    };

    // --- 2. Initialize Options ---
    sortOptionsContainer.innerHTML = config.sortOptions.map(opt => 
        `<a href="#" data-value="${opt.value}">${opt.label}</a>`
    ).join('');

    filterOptionsContainer.innerHTML = config.filterOptions.map(opt => 
        `<a href="#" data-value="${opt.value}">${opt.label}</a>`
    ).join('');

    // --- 3. Dropdown Toggle Logic ---
    const toggleDropdown = (parent) => {
        const isOpen = parent.classList.contains('active');
        // Close all first
        sortParent.classList.remove('active');
        filterParent.classList.remove('active');
        // Toggle the target
        if (!isOpen) parent.classList.add('active');
    };

    sortBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleDropdown(sortParent);
    });

    filterBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleDropdown(filterParent);
    });

    // Close dropdowns when clicking anywhere outside
    window.addEventListener('click', () => {
        sortParent.classList.remove('active');
        filterParent.classList.remove('active');
    });

    // --- 4. Event Listeners for Actions ---
    const triggerUpdate = () => config.onAction(state);

    // Search (with 300ms delay to prevent lagging)
    let timeout;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            state.search = e.target.value.toLowerCase();
            triggerUpdate();
        }, 300);
    });

    // Handle Sort Selection
    sortOptionsContainer.addEventListener('click', (e) => {
        e.preventDefault();
        if (e.target.tagName === 'A') {
            state.sort = e.target.dataset.value;
            currentSortText.innerText = e.target.innerText;
            sortParent.classList.remove('active'); // Auto-close
            triggerUpdate();
        }
    });

    // Handle Filter Selection
    filterOptionsContainer.addEventListener('click', (e) => {
        e.preventDefault();
        if (e.target.tagName === 'A') {
            state.filter = e.target.dataset.value;
            currentFilterText.innerText = e.target.innerText;
            filterParent.classList.remove('active'); // Auto-close
            triggerUpdate();
        }
    });
}