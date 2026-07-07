export function initSearchBar({ onSearchChange }) {
    const input = document.getElementById('searchInput');
    const clear = document.getElementById('clearSearchBtn');
    let timeout;

    input.addEventListener('input', () => {
        clear.classList.toggle('hidden', !input.value);
        clearTimeout(timeout);
        timeout = setTimeout(() => onSearchChange(input.value), 300);
    });

    clear.addEventListener('click', () => {
        input.value = '';
        clear.classList.add('hidden');
        onSearchChange('');
    });
}
