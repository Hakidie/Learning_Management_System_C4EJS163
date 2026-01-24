// pagination.js

/**
 * Renders pagination buttons and attaches events
 * @param {HTMLElement} container - The element to inject pagination into
 * @param {number} currentPage - Current active page
 * @param {number} totalPages - Total number of pages
 * @param {function} onPageChange - Callback function to run when a page is clicked
 */
export function setupPagination(container, currentPage, totalPages, onPageChange) {
    if (!container) return;

    let paginationHtml = `
        <div class="pagination">
            <button class="page-button-prev" ${currentPage === 1 ? 'disabled' : ''}>
                <img src="../assets/icons/pagination_left.png" alt="prev">
            </button>
    `;

    for (let i = 1; i <= totalPages; i++) {
        paginationHtml += `
            <button class="page-button ${currentPage === i ? 'active' : ''}" data-page="${i}">
                ${i}
            </button>
        `;
    }

    paginationHtml += `
            <button class="page-button-next" ${currentPage === totalPages ? 'disabled' : ''}>
                <img src="../assets/icons/pagination_right.png" alt="next">
            </button>
        </div>
    `;

    container.innerHTML = paginationHtml;

    // --- Event Listeners ---
    
    // Page Numbers
    container.querySelectorAll('.page-button').forEach(btn => {
        btn.addEventListener('click', () => {
            const page = parseInt(btn.dataset.page);
            onPageChange(page);
        });
    });

    // Previous Button
    const prevBtn = container.querySelector('.page-button-prev');
    if (prevBtn && currentPage > 1) {
        prevBtn.addEventListener('click', () => onPageChange(currentPage - 1));
    }

    // Next Button
    const nextBtn = container.querySelector('.page-button-next');
    if (nextBtn && currentPage < totalPages) {
        nextBtn.addEventListener('click', () => onPageChange(currentPage + 1));
    }
}