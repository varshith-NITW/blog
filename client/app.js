import { fetchPosts } from './services/api.js';
import { initPostForm } from './components/PostForm.js';
import { renderPosts, showLoading, showError } from './components/PostFeed.js';
import { initSearchBar } from './components/SearchBar.js';
import { initPagination, updatePaginationUI } from './components/Pagination.js';

let currentPage = 1;
let searchQuery = "";
const postsLimit = 4;

document.addEventListener('DOMContentLoaded', () => {
    loadFeed();

    initPostForm({
        onSubmitSuccess: () => {
            currentPage = 1;
            loadFeed();
        }
    });

    initSearchBar({
        onSearchChange: (newQuery) => {
            searchQuery = newQuery;
            currentPage = 1;
            loadFeed();
        }
    });

    initPagination({
        onPageChange: (direction) => {
            if (direction === 'prev' && currentPage > 1) {
                currentPage--;
            } else if (direction === 'next') {
                currentPage++;
            }
            loadFeed();
        }
    });
});

async function loadFeed() {
    showLoading();

    try {
        const data = await fetchPosts({
            search: searchQuery,
            page: currentPage,
            limit: postsLimit
        });

        renderPosts(data);

        updatePaginationUI({
            currentPage: data.currentPage,
            totalPages: data.totalPages
        });

    } catch (error) {
        console.error("Error loading feed:", error);
        showError(error.message, () => loadFeed());
    }
}
