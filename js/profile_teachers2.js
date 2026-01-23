import { teachers } from '../js/teachers.js';
import { searchData } from '../js/search.js';
import { sortData } from '../js/sort.js';
import { filterData } from '../js/filter.js';

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
displayGrid(teachers);

document.addEventListener('input', (e) => {
    if (e.target.id === 'search-input') {
        const search_term = e.target.value.toLowerCase();

        const searched_teachers = searchData(teachers, search_term);
        displayGrid(searched_teachers);
    }
});

document.addEventListener('click', (e) => {
    // Sort
    if (e.target.hasAttribute('data-sort')) {
        e.preventDefault();
        const sort_type = e.target.getAttribute('data-sort');
        
        const sorted = sortData(teachers, sort_type);
        displayGrid(sorted);
        
        // Update the button text to show what is selected
        const currentSortLabel = document.getElementById('current-sort');
        if(currentSortLabel) currentSortLabel.innerText = e.target.innerText;
    }

    // Filter
    if (e.target.hasAttribute('data-filter')) {
        e.preventDefault();
        const filter_type = e.target.getAttribute('data-filter');
        
        const filtered = filterData(teachers, filter_type)
        displayGrid(filtered);

        // Update the filter button text
        const currentFilterLabel = document.getElementById('current-filter');
        if(currentFilterLabel) currentFilterLabel.innerText = e.target.innerText;
    }
});