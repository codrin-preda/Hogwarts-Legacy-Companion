
  // Submit a post
  function submitPost() {
    const postText = document.getElementById('postInput').value;
    const username = localStorage.getItem('username');
    const postData = {
      username: username,
      text: postText,
    };
  
    // Generate a unique key for the post
    const newPostKey = database.ref().child('posts').push().key;
  
    // Save the post data to the database
    const updates = {};
    updates['/posts/' + newPostKey] = postData;
    database.ref().update(updates);
  
    // Clear the post input field
    document.getElementById('postInput').value = '';
  }
  
  // Fetch and display posts
  function fetchPosts() {
    const postsContainer = document.getElementById('postsContainer');
  
    // Listen for changes in the posts data
    database.ref('posts').on('value', (snapshot) => {
      postsContainer.innerHTML = ''; // Clear the existing posts
  
      snapshot.forEach((childSnapshot) => {
        const post = childSnapshot.val();
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `<strong>${post.username}: </strong>${post.text}`;
        postsContainer.appendChild(postElement);
      });
    });
  }
  
  // Add an event listener to the submit button
  const submitBtn = document.getElementById('submitBtn');
  submitBtn.addEventListener('click', submitPost);
  
  // Fetch and display posts when the page loads
  window.addEventListener('load', fetchPosts);
  