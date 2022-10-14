const commentFormHandler = async function (event) {
  event.preventDefault();

  const comment = document.querySelector('textarea').value.trim();

  const url = window.location.href.split('/')

  const post_id = url[url.length - 1]

  console.log(comment)

  if (comment) {
    const response = await fetch('/api/comment', {
      method: 'POST',
      body: JSON.stringify({
        post_id,
        comment_content: comment
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