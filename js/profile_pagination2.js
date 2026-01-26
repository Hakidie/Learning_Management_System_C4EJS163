// Function return courses of a page
export function paginate(items, current_page, items_per_page) {
    const start_index = (current_page - 1) * items_per_page;
    const end_index = start_index + items_per_page;
    return items.slice(start_index, end_index);
}

// Function to render pagination
export function renderPagination(all_items, current_page, items_per_page) {
    const container = document.querySelector('.pagination');
    if (!container) return;

    const total_pages = Math.ceil(all_items.length / items_per_page);

    if (total_pages < 1) {
        container.innerHTML = '';
        return;
    }
    
    let html = `
        <button class="page-button-prev" ${current_page === 1 ? 'disabled' : ''}>
            <img src="../assets/icons/pagination_left.png">
        </button>
    `;

    for (let i = 1; i <= total_pages; i++) {
        const active = Number(i) === Number(current_page);
        html += `
            <button class="page-button ${active ? 'active' : ''}" data-page="${i}">
                ${i}
            </button>
        `;
    }

    html += `
        <button class="page-button-next" ${current_page === total_pages ? 'disabled' : ''}>
            <img src="../assets/icons/pagination_right.png">
        </button>
    `;

    container.innerHTML = html;
}