const postsList = document.getElementById('postsList');
const postCounter = document.getElementById('postCounter');
const paginationFooter = document.getElementById('paginationFooter');

export function showLoading() {
    postsList.innerHTML = '<p class="loading">Loading...</p>';
}

export function showError(msg) {
    postsList.innerHTML = `<p class="empty-state">${msg}</p>`;
}

export function renderPosts(data = {}) {
    const { posts = [], totalCount = 0 } = data;
    postCounter.textContent = `${totalCount} ${totalCount === 1 ? 'post' : 'posts'}`;

    if (!posts.length) {
        postsList.innerHTML = '<p class="empty-state">No posts found.</p>';
        paginationFooter.classList.add('hidden');
        return;
    }

    paginationFooter.classList.remove('hidden');
    postsList.innerHTML = posts.map(post => `
        <article class="post-card">
            ${post.imageUrl ? `<div class="card-img-wrapper"><img src="${post.imageUrl}"></div>` : ''}
            <div class="card-content">
                <span class="post-date">${new Date(post.createdAt).toLocaleDateString()}</span>
                <h3 class="card-title">${escapeHTML(post.title)}</h3>
                <p class="card-body-text">${escapeHTML(post.content)}</p>
            </div>
        </article>
    `).join('');
}

function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, tag => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
    }[tag] || tag));
}
