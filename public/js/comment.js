const commentFormHandler = async function (event) {
    event.preventDefault();
  
    const comment = document.querySelector('textarea[name="comment-body"]').value.trim();
  
    const post_id = document.querySelector('input[name="post-id"]').value;

    // const post_id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];
  
    if (comment) {
        const response = await fetch('/api/comments', {
          method: 'POST',
          body: JSON.stringify({
            post_id,
            comment
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
      
        if (response.ok) {
          document.location.reload();
        } else {
          alert(response.statusText);
        }
      }
  }
  
  document.querySelector('#comment').addEventListener('click', commentFormHandler);