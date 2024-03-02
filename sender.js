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
    
    const reader = new FileReader()
    reader.readAsDataURL(fileInput.files[0])
    reader.addEventListener('load', (e) => {
        const basedData = e.target.result.split(',')[1]
        // console.log(basedData)
        fetchAway(basedData)
    })
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

function fetchAway(basedData) {
    fetch('//https://sleekreports-server-8c8wfgwp8-edgars-projects-2eb72262.vercel.app/upload', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ fileData: basedData })
    }).then(response=> response.json())
    .then(resp => {
        showToast('Report is being generated...');
        console.log(resp)
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
