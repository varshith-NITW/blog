export async function fetchPosts({ search = '', page = 1, limit = 4 } = {}) {
    const url = `/api/posts?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`;
    const response = await fetch(url);
    const data = await response.json();
    
    if (!response.ok) {
        throw new Error(data.error || "Failed to load posts from API.");
    }
    
    return data;
}

export async function publishPost(formData) {
    const response = await fetch('/api/posts', {
        method: 'POST',
        body: formData
    });
    
    const data = await response.json();
    
    if (!response.ok) {
        throw new Error(data.error || "Failed to publish post via API.");
    }
    
    return data;
}
