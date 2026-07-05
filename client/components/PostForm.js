import { publishPost } from '../services/api.js';

export function initPostForm({ onSubmitSuccess }) {
    const postForm = document.getElementById('postForm');
    const fileInput = document.getElementById('image');
    const imagePreviewContainer = document.getElementById('imagePreviewContainer');
    const imagePreview = document.getElementById('imagePreview');
    
    const submitBtn = document.getElementById('submitBtn');
    const submitBtnSpinner = submitBtn.querySelector('.spinner');
    const submitBtnText = submitBtn.querySelector('.btn-text');
    const statusAlert = document.getElementById('statusAlert');

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                imagePreview.src = e.target.result;
                imagePreviewContainer.classList.remove('hidden');
            };
            reader.readAsDataURL(file);
        } else {
            resetImagePreview();
        }
    });

    function resetImagePreview() {
        imagePreview.src = '';
        imagePreviewContainer.classList.add('hidden');
    }

    function resetFormUI() {
        postForm.reset();
        fileInput.value = '';
        resetImagePreview();
    }

    postForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        submitBtn.disabled = true;
        submitBtnText.textContent = "Publishing...";
        submitBtnSpinner.classList.remove('hidden');
        showAlert(null);

        const formData = new FormData(postForm);

        try {
            await publishPost(formData);
            showAlert('Success! Your story has been published to the feed.', 'success');
            resetFormUI();
            
            if (typeof onSubmitSuccess === 'function') {
                onSubmitSuccess();
            }
        } catch (error) {
            console.error("Submit error:", error);
            showAlert(`Error: ${error.message || 'Unable to publish post.'}`, 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtnText.textContent = "Publish";
            submitBtnSpinner.classList.add('hidden');
        }
    });

    function showAlert(message, type = '') {
        if (!message) {
            statusAlert.className = 'alert hidden';
            statusAlert.textContent = '';
            return;
        }
        statusAlert.className = `alert ${type}`;
        statusAlert.textContent = message;
    }
}
