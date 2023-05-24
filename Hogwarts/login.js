// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCssoymj6-gvmrs1MbTO4dDQLi1t8_U6xA",
    authDomain: "hogwarts-90d6c.firebaseapp.com",
    projectId: "hogwarts-90d6c",
    storageBucket: "hogwarts-90d6c.appspot.com",
    messagingSenderId: "98002320920",
    appId: "1:98002320920:web:d63ab66c0cd7699fe50d6d"
  };

  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize variables
const auth = firebase.auth();
const database = firebase.database();
  

 // Set up our register function
function register() {
    // Get all our input fields
    email = document.getElementById('email').value
    password = document.getElementById('password').value
    full_name = document.getElementById('full-name').value
    username = document.getElementById('username').value
    house = document.getElementById('house').value
    wand_type = document.getElementById('wand-type').value
    pet_name = document.getElementById('pet-name').value
    start_date = document.getElementById('start-date').value
    favorite_house = document.getElementById('favorite-house').value
    favorite_character = document.getElementById('favorite-character').value
    spells_unlocked = document.getElementById('spells-unlocked').value
    worlds_unlocked = document.getElementById('worlds-unlocked').value
    days_played = document.getElementById('days-played').value
    achievements_unlocked = document.getElementById('achievements-unlocked').value
  
    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
      alert('Blimey Harry, Email or Password is Outta Line!!')
      return
      // Don't continue running the code
    }
    if (validate_field(full_name) == false || validate_field(username) == false || validate_field(house) == false) {
      alert('One or More Extra Fields is not filled!!')
      return
    }
  
    // Move on with Auth
    auth.createUserWithEmailAndPassword(email, password)
    .then(function() {
      // Declare user variable
      var user = auth.currentUser
  
      // Add this user to Firebase Database
      var database_ref = database.ref()
  
      // Create User data
      var user_data = {
        email: email,
        full_name: full_name,
        username: username,
        house: house,
        wand_type: wand_type,
        pet_name: pet_name,
        start_date: start_date,
        favorite_house: favorite_house,
        favorite_character: favorite_character,
        spells_unlocked: spells_unlocked,
        worlds_unlocked: worlds_unlocked,
        days_played: days_played,
        achievements_unlocked: achievements_unlocked,
        last_login: Date.now()
      }
  
      // Push to Firebase Database
      database_ref.child('users/' + user.uid).set(user_data)
  
      // Store the username in local storage
      localStorage.setItem('userData', JSON.stringify(user_data));
      // DOne
      alert('Wizard Born!!!!!!')
    })
    .catch(function(error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message
  
      alert(error_message)
    })
  }
  
  
  function login() {
    // Get all our input fields
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
      alert('Email or Password is Outta Line!!');
      return;
      // Don't continue running the code
    }
  
    auth.signInWithEmailAndPassword(email, password)
      .then(function (userCredential) {
        // Declare user variable
        var user = userCredential.user;
  
        // Add this user to Firebase Database
        var database_ref = database.ref();
  
        // Retrieve user data from Firebase Database
        database_ref.child('users/' + user.uid).once('value', function (snapshot) {
          var userData = snapshot.val();
  
          // Update the username in local storage
          localStorage.setItem('userData', JSON.stringify(userData));
          localStorage.setItem('username', userData.username);
  
          // Redirect the user to their page
          window.location.href = "user-page.html";
        });
  
      })
      .catch(function (error) {
        // Firebase will use this to alert of its errors
        var error_code = error.code;
        var error_message = error.message;
  
        alert(error_message);
      });
  }
  
  
  // Validate Functions
  function validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
      // Email is good
      return true
    } else {
      // Email is not good
      return false
    }
  }
  
  function validate_password(password) {
    // Firebase only accepts lengths greater than 6
    if (password < 6) {
      return false
    } else {
      return true
    }
  }
  
  function validate_field(field) {
    if (field == null) {
      return false
    }
  
    if (field.length <= 0) {
      return false
    } else {
      return true
    }
  }