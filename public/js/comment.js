const newCommentHandler = async (event) => {
    event.preventDefault();

    const context = document.querySelector('#comment-context').value.trim();
    const blogId = window.location.toString().split('/')[
        window.location.toString().split('/').length -1 
        ];

    if(context) {
        const response = await fetch ('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ blogId, context }),
            headers: {
                'Content-type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.reload;
        } else {
            alert('Failed to create comment!')
        }
    }
};

// ADD A DELETE EVENT HANDLER?

document
.querySelector('.new-comment-form')
.addEventListener('submit', newCommentHandler);
