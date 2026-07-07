const prev = document.getElementById('prevPageBtn');
const next = document.getElementById('nextPageBtn');
const indicator = document.getElementById('pageIndicator');

export function initPagination({ onPageChange }) {
    prev.addEventListener('click', () => onPageChange('prev'));
    next.addEventListener('click', () => onPageChange('next'));
}

export function updatePaginationUI({ currentPage, totalPages }) {
    indicator.textContent = `Page ${currentPage} of ${totalPages}`;
    prev.disabled = currentPage <= 1;
    next.disabled = currentPage >= totalPages || totalPages === 0;
}
