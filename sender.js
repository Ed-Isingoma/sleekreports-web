const uploadButton = document.querySelector('.upload-button');
const fileInput = document.querySelector('#upload-file');
const processingSpinner = document.querySelector('.processing-spinner');
const reportLoader = document.querySelector('.load-report');
const toastContainer = document.querySelector('#toast-container');

uploadButton.addEventListener('click', (event) => {
    if (!fileInput.value) {
        showToast('Please select a file to upload.');
        return;
    }
    const formData = new FormData();
    formData.append('file', fileInput.files[0]);
    
    fetchAway(formData)
    processingSpinner.style.display = 'flex';
});

function showToast(message) {
    const toastContainer = document.querySelector('#toast-container');
    const toast = document.createElement('div');
    toast.classList.add('toast');
    toast.textContent = message;
    toastContainer.appendChild(toast);
    setTimeout(() => {
        toastContainer.removeChild(toast);
    }, 1850);
}

function fetchAway(formData) {
    fetch('https://sleekreportsserver.onrender.com/upload', {
        // fetch('http://127.0.0.1:3000/upload', { //leave for testing purposes
        method: 'POST',
        body: formData
    }).then(response=> response.json())
    .then(resp => {
        showToast('Report is being generated...');
        // console.log(resp)
        for (key in resp) {
            localStorage.setItem(key, resp[key])
        }
        setTimeout(() => {
            reportLoader.click()
        }, 1000)
    }).catch(error => {
        console.error(error);
        processingSpinner.style.display = 'none';
        showToast(error);
    });
}
