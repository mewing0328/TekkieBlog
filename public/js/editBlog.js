// function editBlog() {
//     document.querySelector('#blogEditCard').style.display = 'block';
// }

// const editButtonHandler = async (event) => {
//     event.preventDefault();

//     const name = document.querySelector('#blog-name').value.trim();
//     const description = document.querySelector('#blog-desc').value.trim();

//     if (event.target.hasAttribute('data-id')) {
//         const id = event.target.getAttribute('data-id');

//         const response = await fetch(`/api/blogs/${id}`, {
//             method: 'PUT',
//             body: JSON.stringify({ name, description }),
//             headers: { 'Content-Type': 'application/json' },
//         });

//         if (response.ok) {
//             document.location.reload();
//         } else {
//             alert('Failed to delete blog');
//         }
//     }
// };

// document
//     .querySelector('.blog-list')
//     .addEventListener('click', editButtonHandler);