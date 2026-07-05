const prevPageBtn = document.getElementById('prevPageBtn');
const nextPageBtn = document.getElementById('nextPageBtn');
const pageIndicator = document.getElementById('pageIndicator');

export function initPagination({ onPageChange }) {
    prevPageBtn.addEventListener('click', () => {
        if (typeof onPageChange === 'function') {
            onPageChange('prev');
        }
    });

    nextPageBtn.addEventListener('click', () => {
        if (typeof onPageChange === 'function') {
            onPageChange('next');
        }
    });
}

export function updatePaginationUI({ currentPage, totalPages }) {
    pageIndicator.textContent = `Page ${currentPage} of ${totalPages}`;
    prevPageBtn.disabled = currentPage <= 1;
    nextPageBtn.disabled = currentPage >= totalPages || totalPages === 0;
}
