// Retrieve the user data from local storage
const userData = JSON.parse(localStorage.getItem('userData'));

// Get a reference to the userContainer element
const userContainer = document.getElementById('userContainer');

// Create the HTML content for the user container
const userContent = `
  <span id="username">${userData.username}</span>
  <div id="housePictureContainer"></div>
  <button id="logoutBtn">Logout</button>
  <div>
    <p>Email: ${userData.email}</p>
    <p>Full Name: ${userData.full_name}</p>
    <p>House: ${userData.house}</p>
    <p>Wand Type: ${userData.wand_type}</p>
    <p>Pet Name: ${userData.pet_name}</p>
    <p>Start Date: ${userData.start_date}</p>
    <p>Favorite House: ${userData.favorite_house}</p>
    <p>Favorite Character: ${userData.favorite_character}</p>
    <p>Spells Unlocked: <input type="number" id="spellsUnlockedInput" value="${userData.spells_unlocked}"></p>
    <p>Worlds Unlocked: <input type="number" id="worldsUnlockedInput" value="${userData.worlds_unlocked}"></p>
    <p>Days Played: <input type="number" id="daysPlayedInput" value="${userData.days_played}"></p>
    <p>Achievements Unlocked: <input type="number" id="achievementsUnlockedInput" value="${userData.achievements_unlocked}"></p>
    <button id="updateStatsButton">Update Stats</button>
  </div>
  
`;


// Set the HTML content of the userContainer
userContainer.innerHTML = userContent;

// Check if the user is logged in
function checkLoginStatus() {
    var username = localStorage.getItem('username');
    if (username) {
        // User is logged in
        document.getElementById('username').textContent = 'Welcome, ' + username;
        document.getElementById('logoutBtn').addEventListener('click', logout);
        showHousePicture(userData.house); // Call function to display the house picture

        // Add event listener to the updateStatsButton
        document.getElementById('updateStatsButton').addEventListener('click', updateStats);
    } else {
        // User is logged out
        redirectToLogin();
    }
}

// Function to display the house picture
function showHousePicture(house) {
    // Get the housePictureContainer element
    const housePictureContainer = document.getElementById('housePictureContainer');

    // Create an image element for the house picture
    const housePicture = document.createElement('img');

    // Set the source and alt attributes based on the user's house
    if (house === 'Gryffindor') {
        housePicture.src = 'pic/gryffindor.webp';
        housePicture.alt = 'Gryffindor House';
    } else if (house === 'Hufflepuff') {
        housePicture.src = 'pic/hufflepuff.webp';
        housePicture.alt = 'Hufflepuff House';
    } else if (house === 'Ravenclaw') {
        housePicture.src = 'pic/ravenclaw.webp';
        housePicture.alt = 'Ravenclaw House';
    } else if (house === 'Slytherin') {
        housePicture.src = 'pic/slytherin.webp';
        housePicture.alt = 'Slytherin House';
    }

    // Append the house picture to the housePictureContainer
    housePictureContainer.appendChild(housePicture);
}

// Logout function
function logout() {
    // Clear the username and user data from localStorage
    localStorage.removeItem('username');
    localStorage.removeItem('userData');
    // Redirect to the login page
    redirectToLogin();
}

// Redirect to the login page
function redirectToLogin() {
    window.location.href = 'login.html';
}

// Search wizard functionality
const searchButton = document.querySelector('.searchBox a');
searchButton.addEventListener('click', searchWizard);


function searchWizard() {
  const searchInput = document.querySelector('.searchBox input').value;
  if (searchInput.trim() !== '') {
    database.ref('users').orderByChild('username').equalTo(searchInput).once('value', (snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          const searchedUserData = childSnapshot.val();
          const searchedUserContent = `
            <span id="username">${searchedUserData.username}</span>
            <div id="housePictureContainer"></div>
            <div>
              <p>Email: ${searchedUserData.email}</p>
              <p>Full Name: ${searchedUserData.full_name}</p>
              <p>House: ${searchedUserData.house}</p>
              <p>Wand Type: ${searchedUserData.wand_type}</p>
              <p>Pet Name: ${searchedUserData.pet_name}</p>
              <p>Start Date: ${searchedUserData.start_date}</p>
              <p>Favorite House: ${searchedUserData.favorite_house}</p>
              <p>Favorite Character: ${searchedUserData.favorite_character}</p>
              <p>Spells Unlocked: ${searchedUserData.spells_unlocked}</p>
              <p>Worlds Unlocked: ${searchedUserData.worlds_unlocked}</p>
              <p>Days Played: ${searchedUserData.days_played}</p>
              <p>Achievements Unlocked: ${searchedUserData.achievements_unlocked}</p>
            </div>
          `;
          userContainer.innerHTML = searchedUserContent;
          showHousePicture(searchedUserData.house);
        });
      } else {
        userContainer.innerHTML = '<p>No user found</p>';
      }
    });
  }
}



// Function to update the stats
function updateStats() {
    const newSpellsUnlocked = document.getElementById('spellsUnlockedInput').value;
    const newWorldsUnlocked = document.getElementById('worldsUnlockedInput').value;
    const newDaysPlayed = document.getElementById('daysPlayedInput').value;
    const newAchievementsUnlocked = document.getElementById('achievementsUnlockedInput').value;

    // Update the userData object
    userData.spells_unlocked = newSpellsUnlocked;
    userData.worlds_unlocked = newWorldsUnlocked;
    userData.days_played = newDaysPlayed;
    userData.achievements_unlocked = newAchievementsUnlocked;

    // Update the local storage
    localStorage.setItem('userData', JSON.stringify(userData));

    // Display success message or perform any other desired actions
    alert('Stats updated successfully!');
}

// Call the checkLoginStatus function when the page loads
window.addEventListener('load', checkLoginStatus);
