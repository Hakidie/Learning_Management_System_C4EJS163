import { courses } from '../js/courses.js';
import { searchData } from '../js/search.js';
import { sortData } from '../js/sort.js';
import { filterData } from '../js/filter.js';

function displayGrid(displayed_courses) {
    const courses_grid = document.getElementById('course-grid');

    courses_grid.innerHTML = displayed_courses.map(course => `
        <div class="card">
            <div class="picture"><img src="${course.img}" alt="${course.title}"></div>
            <h3>${course.title}</h3>
            <p>By ${course.instructor}</p>
            <div class="progress-bar"><div class="progress" style="width: 40%"></div></div>
            <div class="rating">
                <img src="../assets/icons/starts-rating.png" alt="star">
                <p>(${course.ratings} Ratings)</p>
            </div>
        </div>
    `).join('');
}
displayGrid(courses);

document.addEventListener('input', (e) => {
    if (e.target.id === 'search-input') {
        const search_term = e.target.value.toLowerCase();

        const searched_courses = searchData(courses, search_term);
        displayGrid(searched_courses);
    }
});

document.addEventListener('click', (e) => {
    // Sort
    if (e.target.hasAttribute('data-sort')) {
        e.preventDefault();
        const sort_type = e.target.getAttribute('data-sort');
        
        const sorted = sortData(courses, sort_type);
        displayGrid(sorted);
        
        // Update the button text to show what is selected
        const currentSortLabel = document.getElementById('current-sort');
        if(currentSortLabel) currentSortLabel.innerText = e.target.innerText;
    }

    // Filter
    if (e.target.hasAttribute('data-filter')) {
        e.preventDefault();
        const filter_type = e.target.getAttribute('data-filter');
        
        const filtered = filterData(courses, filter_type)
        displayGrid(filtered);

        // Update the filter button text
        const currentFilterLabel = document.getElementById('current-filter');
        if(currentFilterLabel) currentFilterLabel.innerText = e.target.innerText;
    }
});


