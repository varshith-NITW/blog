export function initSearchBar({ onSearchChange }) {
    const searchInput = document.getElementById('searchInput');
    const clearSearchBtn = document.getElementById('clearSearchBtn');
    
    let searchDebounceTimeout;

    searchInput.addEventListener('input', (e) => {
        const queryValue = e.target.value;

        if (queryValue.length > 0) {
            clearSearchBtn.classList.remove('hidden');
        } else {
            clearSearchBtn.classList.add('hidden');
        }

        clearTimeout(searchDebounceTimeout);
        searchDebounceTimeout = setTimeout(() => {
            if (typeof onSearchChange === 'function') {
                onSearchChange(queryValue);
            }
        }, 300);
    });

    clearSearchBtn.addEventListener('click', () => {
        searchInput.value = '';
        clearSearchBtn.classList.add('hidden');
        
        if (typeof onSearchChange === 'function') {
            onSearchChange('');
        }
    });
}
