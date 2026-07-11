export async function fetchPosts({ search = '', page = 1, limit = 4 } = {}) {
    const res = await fetch(`/api/posts?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to load posts");
    return data;
}

export async function publishPost(formData) {
    const res = await fetch('/api/posts', { method: 'POST', body: formData });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to publish post");
    return data;
}
