export async function fetchPosts({ search = '', page = 1, limit = 4 } = {}) {
    const res = await fetch(`/api/posts?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`);
    return res.json();
}

export async function publishPost(formData) {
    const res = await fetch('/api/posts', { method: 'POST', body: formData });
    return res.json();
}
