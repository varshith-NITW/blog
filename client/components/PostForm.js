import { publishPost } from '../services/api.js';

export function initPostForm({ onSubmitSuccess }) {
    const form = document.getElementById('postForm');
    const input = document.getElementById('image');
    const previewContainer = document.getElementById('imagePreviewContainer');
    const preview = document.getElementById('imagePreview');
    const status = document.getElementById('statusAlert');
    const submitBtn = document.getElementById('submitBtn');

    input.addEventListener('change', () => {
        const file = input.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                preview.src = e.target.result;
                previewContainer.classList.remove('hidden');
            };
            reader.readAsDataURL(file);
        } else {
            resetPreview();
        }
    });

    function resetPreview() {
        preview.src = '';
        previewContainer.classList.add('hidden');
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        submitBtn.disabled = true;
        status.className = 'alert hidden';

        try {
            const res = await publishPost(new FormData(form));
            if (res.error) throw new Error(res.error);
            status.className = 'alert success';
            status.textContent = 'Published successfully!';
            form.reset();
            resetPreview();
            onSubmitSuccess();
        } catch (err) {
            status.className = 'alert error';
            status.textContent = err.message || 'Error publishing post';
        } finally {
            submitBtn.disabled = false;
        }
    });
}
