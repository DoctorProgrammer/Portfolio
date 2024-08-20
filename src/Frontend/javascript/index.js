document.addEventListener('DOMContentLoaded', async function () {
    // if there is a cookie with the name "mode", set the light mode to light or dark, depending on the value of the cookie, if not, create a cookie with the name "mode" and the value "light"
    if (document.cookie.split(';').some((item) => item.trim().startsWith('mode='))) {
        const mode = document.cookie.split('; ').find(row => row.startsWith('mode')).split('=')[1];
        setMode(mode);
    } else {
        document.cookie = 'mode=light';
    }

    const comments = await fetchComments();
    const commentForm = document.getElementById('commentForm');

    loadComments(comments);

    commentForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const prename = document.getElementById('prename').value;
        document.getElementById('prename').value = '';
        const name = document.getElementById('name').value;
        document.getElementById('name').value = '';
        const reference = document.getElementById('reference').value;
        document.getElementById('reference').value = '';
        const content = document.getElementById('comment').value;
        document.getElementById('comment').value = '';

        const newComment = {
            prename,
            name,
            reference,
            content
        };

        const response = await fetch('http://localhost:3000/comment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newComment)
        });

        const data = await response.json();
        loadComments(data);
    });
});

function loadComments(comments) {
    const commentsContainer = document.getElementById('commentContainer');

    commentsContainer.innerHTML = '';

    comments.forEach(comment => {
        const commentDiv = document.createElement('div');
        commentDiv.classList.add('comment');

        const initialsDiv = document.createElement('div');
        initialsDiv.classList.add('initials');
        initialsDiv.textContent = comment.initials;
        commentDiv.appendChild(initialsDiv);

        const contentDiv = document.createElement('div');

        const nameP = document.createElement('p');
        nameP.classList.add('name');
        nameP.textContent = comment.author;
        contentDiv.appendChild(nameP);

        const referenceH3 = document.createElement('h3');
        referenceH3.classList.add('reference');
        referenceH3.textContent = comment.reference;
        contentDiv.appendChild(referenceH3);

        const contentP = document.createElement('p');
        contentP.classList.add('content');
        contentP.textContent = comment.content;
        contentDiv.appendChild(contentP);

        commentDiv.appendChild(contentDiv);

        commentsContainer.appendChild(commentDiv);
    });
}

function setMode(mode) {
    // change the root variables in the css file "--default-font-color: #212121;"
    const root = document.documentElement;
    root.style.setProperty('--default-font-color', mode === 'light' ? '#212121' : '#f5f5f5');
    root.style.setProperty('--default-bg-color', mode === 'light' ? '#EFF2FB' : '#212121');
    root.style.setProperty('--secondary-bg-color', mode === 'light' ? '#FFFFFF' : '#191919');
    root.style.setProperty('--gradient-color-1', mode === 'light' ? '#EFF2FB' : '#191919');

    // make all elements with the class "dark" visible when the mode is dark and invisible when the mode is light
    const darkElements = document.getElementsByClassName('dark');
    const darkElementsFlex = document.getElementsByClassName('dark-flex');
    const lightElements = document.getElementsByClassName('light');
    const lightElementsFlex = document.getElementsByClassName('light-flex');

    for (let i = 0; i < darkElements.length; i++) {
        darkElements[i].style.display = mode === 'dark' ? 'block' : 'none';
    }

    for (let i = 0; i < darkElementsFlex.length; i++) {
        darkElementsFlex[i].style.display = mode === 'dark' ? 'flex' : 'none';
    }

    for (let i = 0; i < lightElements.length; i++) {
        lightElements[i].style.display = mode === 'light' ? 'block' : 'none';
    }

    for (let i = 0; i < lightElementsFlex.length; i++) {
        lightElementsFlex[i].style.display = mode === 'light' ? 'flex' : 'none';
    }
}

function toggleMode() {
    const mode = document.cookie.split('; ').find(row => row.startsWith('mode')).split('=')[1];
    const newMode = mode === 'light' ? 'dark' : 'light';
    document.cookie = `mode=${newMode}`;
    setMode(newMode);
}

// function to fetch (get) data from url: https://127.0.0.1/comment
async function fetchComments() {
    try {
        const response = await fetch('http://localhost:3000/comment', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())

        return response;
    } catch (error) {
        console.error('Error fetching comments:', error);
    }
}