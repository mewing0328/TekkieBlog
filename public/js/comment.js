// CREATE a new comment
const newCommentHandler = async (event) => {
  event.preventDefault();

  const context = document.querySelector('#comment-context').value.trim();
  const blog_id = window.location.toString().split('/')
  [window.location.toString().split('/').length - 1]
    ;

  if (context) {
    const response = await fetch('/api/comments/', {
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
document.querySelector('.new-comment-form').addEventListener('submit', newCommentHandler);

// EDIT A COMMENT
// User clicks on edit comment button IF user OWNs the comment - see handlebar for {{if ownsComment}}
function editComment() {
  document.querySelector('.commentEditCard').style.display = 'block';
}

// PUT for DB
const editCommentFormHandler = async (event) => {
  event.preventDefault();

  console.log('EDIT FUNCTION');

  if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');

  console.log(id);

  const context = document.querySelector('#editcomment-text').value.trim();

      const response = await fetch(`/api/comments/${id}`, {
          method: 'PUT',
          body: JSON.stringify({ context }),
          headers: { 'Content-Type': 'application/json' },
      });

      // IF response is successful, then reload
      if (response.ok) {
          document.location.reload();
      } else {
          console.log(response.statusText);
      }

  };
};
document.querySelector('#submitEditComment-btn').addEventListener('click', (event) => {
  editCommentFormHandler(event);
});

// DELETE a COMMENT
const delCommentButtonHandler = async (event) => {

  if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');

      const response = await fetch(`/api/comments/${id}`, {
          method: 'DELETE',
      });

      if (response.ok) {
          location.reload();
      } else {
          alert('Failed to delete comment');
      }
  }
};
document.querySelector('.delete-comment').addEventListener('click', delCommentButtonHandler);