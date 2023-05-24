// Function to fetch and display the user list
function fetchUserList() {
    const usersContainer = document.getElementById('usersContainer');
    const userList = document.getElementById('usersList');
  
    // Clear the existing user list
    userList.innerHTML = '';
  
    // Fetch the users from the database
    database.ref('users').once('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const userData = childSnapshot.val();
        const username = userData.username;
  
        // Create a list item for each username
        const listItem = document.createElement('li');
        listItem.textContent = username;
  
        // Append the list item to the user list
        userList.appendChild(listItem);
      });
    });
  
    // Append the user list to the users container
    usersContainer.appendChild(userList);
  }
  
  // Call the fetchUserList function when the page is loaded
  window.addEventListener('load', fetchUserList);
  