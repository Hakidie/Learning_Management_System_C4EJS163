import { teachers } from '../js/teachers.js';
import { searchData } from '../js/search.js';
import { sortData } from '../js/sort.js';
import { filterData } from '../js/filter.js';
import { paginate, renderPagination } from '../js/profile_pagination2.js';

// Pagination
let all_items = [...teachers];
let current_page = 1;
const items_per_page = 8;

function displayGrid(displayed_teachers) {
    const teachers_grid = document.getElementById('teacher-grid');

    teachers_grid.innerHTML = displayed_teachers.map(teacher => `
        <div class="card">
            <div class="picture">
                <img src="${teacher.img}" alt="${teacher.name}">
                <h3>${teacher.name}</h3>
                <p>${teacher.role}</p>
            </div>
            <button class="send-message">
                Send Message
                <img src="../assets/icons/mail.png">
            </button>
        </div>
    `).join('');
}
// displayGrid(teachers);

// Function to render course cards to pages
function render() {
    if (current_page < 1) current_page = 1;
    // Get the current slide of course for current page
    const paginated_items = paginate(all_items, current_page, items_per_page);
    
    displayGrid(paginated_items);

    renderPagination(all_items, current_page, items_per_page);
}


// Check input for search
document.addEventListener('input', (e) => {
    if (e.target.id === 'search-input') {
        const search_term = e.target.value.toLowerCase();

        // const searched_teachers = searchData(teachers, search_term);
        // displayGrid(searched_teachers);
        all_items = searchData(teachers, search_term);
        current_page = 1;
        render();
    }
});

// Check click for buttons
document.addEventListener('click', (e) => {
    // Sort
    if (e.target.hasAttribute('data-sort')) {
        e.preventDefault();
        const sort_type = e.target.getAttribute('data-sort');
        
        // const sorted = sortData(teachers, sort_type);
        // displayGrid(sorted);
        all_items = sortData(all_items, sort_type);
        current_page = 1;
        render();
        
        // Update the button text to show what is selected
        const currentSortLabel = document.getElementById('current-sort');
        if(currentSortLabel) currentSortLabel.innerText = e.target.innerText;
    }

    // Filter
    if (e.target.hasAttribute('data-filter')) {
        e.preventDefault();
        const filter_type = e.target.getAttribute('data-filter');
        
        // const filtered = filterData(teachers, filter_type)
        // displayGrid(filtered);
        all_items = filterData(teachers, filter_type);
        current_page = 1;
        render();

        // Update the filter button text
        const currentFilterLabel = document.getElementById('current-filter');
        if(currentFilterLabel) currentFilterLabel.innerText = e.target.innerText;
    }

    // Pagination buttons
    const button = e.target.closest('button');
    if (!button) return;

    if (button.classList.contains('page-button')) {
        current_page = Number(button.getAttribute('data-page'));
        render();
    } else if (button.classList.contains('page-button-prev') && current_page > 1) {
        current_page--;
        render();
    } else if (button.classList.contains('page-button-next')) {
        const total_pages = Math.ceil(all_items.length / items_per_page);
        if (current_page < total_pages) {
            current_page++;
            render();
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
    render();
});
