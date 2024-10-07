const express = require('express');
const app = express();
const router = express.Router();
app.use(express.json());

/*
- Create new html file name home.html 
- add <h1> tag with message "Welcome to ExpressJs Tutorial"
- Return home.html page to client
*/
const path = require('path');
router.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});
/*
- Return all details from user.json file to client as JSON format
*/
const fs = require('fs');
router.get('/profile', (req, res) => {
    fs.readFile('user.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ status: false, message: "Server Error" });
        }
        res.json(JSON.parse(data));
    });
});
/*
- Modify /login router to accept username and password as JSON body parameter
- Read data from user.json file
- If username and  passsword is valid then send resonse as below 
    {
        status: true,
        message: "User Is valid"
    }
- If username is invalid then send response as below 
    {
        status: false,
        message: "User Name is invalid"
    }
- If passsword is invalid then send response as below 
    {
        status: false,
        message: "Password is invalid"
    }
*/
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Hardcoded user data based on your JSON file
  const userData = {
      username: "bret",
      password: "bret@123"
  };

  if (username !== userData.username) {
      return res.json({ status: false, message: "User Name is invalid" });
  }
  
  if (password !== userData.password) {
      return res.json({ status: false, message: "Password is invalid" });
  }
  
  res.json({ status: true, message: "User Is valid" });
});

/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/
router.get('/logout', (req, res) => {
  const { username } = req.query;
  if (username) {
      res.send(`<b>${username} successfully logged out.</b>`);
  } else {
      res.send('<b>Username is required to logout.</b>');
  }
});
/*
Add error handling middleware to handle below error
- Return 500 page with message "Server Error"
*/
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('<h1>500 - Server Error</h1>');
});
