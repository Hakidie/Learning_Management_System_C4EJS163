// Wait 1s for the HTML to finish loading from the other script
setTimeout(() => {
    const sort_button = document.querySelector('.dropdown-sort');
    const filter_button = document.querySelector('.dropdown-filter');
    const sort_menu = document.getElementById('sort-options'); 
    const filter_menu = document.getElementById('filter-options');

    sort_button.addEventListener('click', () => {
        console.log("sort pressed");
        sort_menu.classList.toggle('show');
    });
  
    filter_button.addEventListener('click', () => {
        console.log("filter pressed");
        filter_menu.classList.toggle('show');
    });
}, 1000);
