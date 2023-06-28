//Imports
const express = require("express");
const app = express();
const cors = require("cors");

// Middleware
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded data (like HTML form submissions) into an object we can work with
app.use(express.json()); // for parsing the body of an HTTP request where it is in JSON format into an object we can work with
app.use(cors()); // We use this to accept HTTP requests from a specific recipient (or in this case with no further options defined, everybody)

// mock db of users
let users = [
  { email: "rob@dvds.com", password: "rob123" },
  { email: "john@dvds.com", password: "john123" },
];

// Login endpoint 1
app.post("/login", (req, res) => {
  console.log(req.body); // view the req.body object (our incoming data)
  for (let i = 0; i < users.length; i++) {
    if (
      users[i].email === req.body.email &&
      users[i].password === req.body.password
    ) {
      // "if the submitted data matches what is in our mock database"
      return res.redirect("http://127.0.0.1:5500/frontend/loggedin.html"); // the return means we will exit the app.post callback function immediately
    }
  }
  res.status(401).send("email or password is incorrect"); // if no match found after looping through all elements, send back an error
});

// Endpoint 2
app.post("/loginWithFetch", (req, res) => {
  console.log("loginWithFetch is called", req.body);
  for (let i = 0; i < users.length; i++) {
    if (
      users[i].email === req.body.email &&
      users[i].password === req.body.password
    ) {
      return res.sendStatus(200);
    }
  }
  res.sendStatus(401);
});

// Login endpoint using the fetch() API
// app.post("/loginWithFetch", (req, res) => {
//   console.log(req.body); // view the req.body object (our incoming data)
//   for (let i = 0; i < users.length; i++) {
//     if (
//       users[i].email === req.body.email &&
//       users[i].password === req.body.password
//     ) {
//       // "if the submitted data matches what is in our mock database"
//       return res.sendStatus(200); // the return means we will exit the app.post callback function immediately
//     }
//   }
//   res.sendStatus(401); // if no match found after looping through all elements, send back an error
// });

// Expose port 4000
const port = 4000;
app
  .listen(port, () => {
    console.log(`Listening at http://localhost:${port}/`);
  })
  .on("error", (error) => {
    if (error.code === "EADDRINUSE") {
      console.error(
        "Address is already in use, try a different port or close any other already running servers."
      );
    } else {
      console.error("Server error:", error);
    }
  });
