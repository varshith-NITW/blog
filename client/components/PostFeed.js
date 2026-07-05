const postsList = document.getElementById('postsList');
const postCounter = document.getElementById('postCounter');
const paginationFooter = document.getElementById('paginationFooter');

export function showLoading() {
    postsList.innerHTML = `
        <div class="loading-state">
            <div class="spinner"></div>
            <p>Retrieving stories...</p>
        </div>
    `;
}

export function showError(message, onRetry) {
    postsList.innerHTML = `
        <div class="empty-state">
            <p style="color: var(--error);">Error loading feeds: ${message}</p>
            <button class="pag-btn" id="retryFeedBtn">Retry</button>
        </div>
    `;
    
    const retryBtn = document.getElementById('retryFeedBtn');
    if (retryBtn && typeof onRetry === 'function') {
        retryBtn.addEventListener('click', onRetry);
    }
}

export function renderPosts(data) {
    const { posts, totalCount } = data;
    
    postCounter.textContent = `${totalCount} ${totalCount === 1 ? 'story' : 'stories'}`;

    if (posts.length === 0) {
        postsList.innerHTML = `
            <div class="empty-state">
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="upload-icon"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                <p>No stories found matching your filter.</p>
            </div>
        `;
        paginationFooter.classList.add('hidden');
        return;
    }

    paginationFooter.classList.remove('hidden');

    postsList.innerHTML = posts.map(post => {
        const formattedDate = formatDate(post.createdAt);
        const coverImage = post.imageUrl || 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600"><rect width="800" height="600" fill="%2311111b"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="system-ui" font-size="24" fill="%2345475a">No Media Attached</text></svg>';
        
        const escapedTitle = escapeHTML(post.title);
        const escapedContent = escapeHTML(post.content);

        return `
            <article class="post-card">
                <div class="card-img-wrapper">
                    <img src="${coverImage}" alt="${escapedTitle} Cover" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22800%22 height=%22600%22><rect width=%22800%22 height=%22600%22 fill=%22%2311111b%22/><text x=%2250%%22 y=%2250%%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-family=%22system-ui%22 font-size=%2224%22 fill=%22%2345475a%22>Media Unavailable</text></svg>'">
                </div>
                <div class="card-content">
                    <div class="card-header-area">
                        <span class="post-date">${formattedDate}</span>
                        <h3 class="card-title" title="${escapedTitle}">${escapedTitle}</h3>
                    </div>
                    <p class="card-body-text">${escapedContent}</p>
                </div>
            </article>
        `;
    }).join('');
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
    );
}
