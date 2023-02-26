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




// // For the PUT
// document
// .querySelector('.edit-blog-form')
// .addEventListener('edit', newFormHandler);

// // DELETE A COMMENT - NEED TP MOVE TO ANOTHER JS FILE

// const delButtonHandler = async (event) => {
//     if (event.target.hasAttribute('data-id')) {
//       const id = event.target.getAttribute('data-id');
  
//       const response = await fetch(`/api/comments/${id}`, {
//         method: 'DELETE',
//       });
  
//       if (response.ok) {
//         document.location.replace(`/blog/${blog_id}`);
//       } else {
//         alert('Failed to delete comment!');
//       }
//     }
//   };

document
.querySelector('.new-comment-form')
.addEventListener('submit', newCommentHandler);

// document
// .querySelector('#delete')
// .addEventListener('click', delButtonHandler);