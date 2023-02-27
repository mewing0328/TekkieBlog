const newCommentHandler = async (event) => {
    event.preventDefault();

    const context = document.querySelector('#comment-context').value.trim();
    const blog_id = window.location.toString().split('/')
        [window.location.toString().split('/').length -1]
        ;

    if(context) {
        const response = await fetch ('/api/comments/', {
            method: 'POST',
            body: JSON.stringify({ blog_id, context }),
            headers: {
                'Content-type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.replace(`/blog/${blog_id}`);
        } else {
            alert('Failed to create comment!')
        }
    }
};

document
.querySelector('.new-comment-form')
.addEventListener('submit', newCommentHandler);

const delButtonHandler = async (event) => {
    event.preventDefault();

    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/comments/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Unable to delete!');
      }
    }
  };

document
.querySelector('.delete-comment')
.addEventListener('click', delButtonHandler);