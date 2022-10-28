const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const username = document.querySelector('#usernameInput').value.trim();
  const password = document.querySelector('#passwordInput').value.trim();

  if (username && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to homepage
      document.location.replace('/');
    } else {
      alert('Please enter your username and password');
    }
  }
};



const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#inputUsername').value.trim();
  const email = document.querySelector('#inputEmail').value.trim();
  const password = document.querySelector('#inputPassword').value.trim();

  if (username && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    // check the response status
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to sign up.');
    }
  }
};



document
  .querySelector('#login')
  .addEventListener('submit', loginFormHandler);


document
  .querySelector('#signup')
  .addEventListener('submit', signupFormHandler);