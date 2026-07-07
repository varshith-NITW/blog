import { fetchPosts } from './services/api.js';
import { initPostForm } from './components/PostForm.js';
import { renderPosts, showLoading, showError } from './components/PostFeed.js';
import { initSearchBar } from './components/SearchBar.js';
import { initPagination, updatePaginationUI } from './components/Pagination.js';

let currentPage = 1;
let searchQuery = "";

document.addEventListener('DOMContentLoaded', () => {
    loadFeed();
    initPostForm({ onSubmitSuccess: () => { currentPage = 1; loadFeed(); } });
    initSearchBar({ onSearchChange: (q) => { searchQuery = q; currentPage = 1; loadFeed(); } });
    initPagination({ onPageChange: (dir) => {
        currentPage += (dir === 'next' ? 1 : -1);
        loadFeed();
    }});
});

async function loadFeed() {
    showLoading();
    try {
        const data = await fetchPosts({ search: searchQuery, page: currentPage, limit: 4 });
        renderPosts(data);
        updatePaginationUI(data);
    } catch (err) {
        showError(err.message);
    }
}
