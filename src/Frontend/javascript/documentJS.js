/*
    <section id="documents">
        <div class="document">
            <a href="./documents/TrachselRobin_CV.pdf" target="_blank">TrachselRobin_CV.pdf</a>
            <a href="./documents/TrachselRobin_CV.pdf" download>
                <img src="./images/download.png" alt="download">
            </a>
        </div>
    </section>
*/

const url = '127.0.0.1:3000';

document.addEventListener('DOMContentLoaded', async function () {
    const documents = document.getElementById('documents');

    // get all comments form ./documents/ folder, not from the database
    const files = await fetchDocuments();

    files.forEach(file => {
        const documentDiv = document.createElement('div');
        documentDiv.classList.add('document');

        const documentLink = document.createElement('a');
        documentLink.href = `./documents/${file}`;
        documentLink.target = '_blank';
        documentLink.innerText = file;

        const downloadLink = document.createElement('a');
        downloadLink.href = `./documents/${file}`;
        downloadLink.download = '';
        downloadLink.innerHTML = '<img src="./images/download.png" alt="download">';

        documentDiv.appendChild(documentLink);
        documentDiv.appendChild(downloadLink);

        documents.appendChild(documentDiv);
    });
});

async function fetchDocuments() {
    try {
        const response = await fetch(`https://${url}/document`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())

        return response;
    } catch (error) {
        console.error('From Script: Error fetching comments:', error);
    }
}