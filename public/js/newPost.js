const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#post-title').value.trim();
  const post_content = document.querySelector('#post-content').value.trim();

console.log(title)
console.log(post_content)
  if (title && postContent) {
    const response = await fetch(`/api/post`, { 
      method: 'POST',
      body: JSON.stringify({ 
        title, 
        post_content 
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create a post');
    }
  }
};

document
.querySelector('.new-post-form')
.addEventListener('submit', newFormHandler);
