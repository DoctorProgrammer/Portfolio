document.addEventListener('DOMContentLoaded', function () {
    const comments = fetchComments();
    console.log(comments);
});

// function to fetch (get) data from url: https://127.0.0.1/comment
async function fetchComments() {
    try {
        const response = await fetch('http://localhost:3000/comment', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching comments:', error);
    }
}