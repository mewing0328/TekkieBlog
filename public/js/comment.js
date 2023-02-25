const newCommentHandler = async (event) => {
    event.preventDefault();

    const context = document.querySelector('#comment-context').value.trim();

    if( context) {
        const response = await fetch ('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ context }),
            headers: {
                'Content-type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/blog');
        } else {
            alert('Failed to create comment!')
        }
    }
};

// ADD A DELETE EVENT HANDLER?

document
.querySelector('.new-comment-form')
.addEventListener('submit', newCommentHandler);
