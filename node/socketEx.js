/*
  Simple login and chat F28WP
  Need to register and login before you can send/see chat messages
  Stores login in a database (username/password)

  Key featurse:
  * minimal working example (single js file)
  * sql datbase (user has to register or login to chat)
  * client-client communication
  * data is broadbast to other clients that have logged in
  * dependancies: socket.io, mysql and express
  */

// Client Script
let htmlContent = `
 <div id="signDiv">
   Username: <input id="signDiv-username" type="text"></input><br>
   Password: <input id="signDiv-password" type="password"></input>
   <br>
   <button id="signDiv-signIn">Sign In</button>
   <button id="signDiv-signUp">Sign Up</button>
 </div>
 
 <div id="gameDiv" style="display:none;">
   <div id="chat-text" style="position:absolute;top:0px;bottom:25px;width:99%;overflow-y:scroll;">
     <div>Logged In!</div>
   </div>
 
   <form id="chat-form">
     <input id="chat-input" type="text" style="position:absolute;bottom:0px;height:25px;width:99%;"></input>
   </form>
   <button style='position:absolute;right:5px;top:5px;' onClick="window.location.reload();">Logout</button> 
 </div>
 
 <script src="/socket.io/socket.io.js"></script>
 
 <script>
   var socket = io();
   
   //sign
   var signDiv         = document.getElementById('signDiv');
   var signDivUsername = document.getElementById('signDiv-username');
   var signDivSignIn   = document.getElementById('signDiv-signIn');
   var signDivSignUp   = document.getElementById('signDiv-signUp');
   var signDivPassword = document.getElementById('signDiv-password');
   
   signDivSignIn.onclick = function(){
     socket.emit('signIn',{username:signDivUsername.value,password:signDivPassword.value});
   }
   signDivSignUp.onclick = function(){
     socket.emit('signUp',{username:signDivUsername.value,password:signDivPassword.value});
   }
   socket.on('signInResponse',function(data){
     if(data.success){
       signDiv.style.display = 'none';
       gameDiv.style.display = 'inline-block';
     } else
       alert("Sign in unsuccessul.");
   });
   socket.on('signUpResponse',function(data){
     if(data.success){
       alert("Sign up successul.");
     } else
       alert("Sign up unsuccessul.");
   });
   
   //chat - only be used after logging in
   var chatText  = document.getElementById('chat-text');
   var chatInput = document.getElementById('chat-input');
   var chatForm  = document.getElementById('chat-form');
   chatInput.value = 'Type text and press return';
 
   
   socket.on('addToChat',function(data){
     chatText.innerHTML += '<div>' + data + '</div>';
     chatText.scrollTop = chatText.scrollHeight;
   });
   
   chatForm.onsubmit = function(e){
     e.preventDefault();
     socket.emit('sendMsgToServer',chatInput.value);
     chatInput.value = '';		
   }
 </script>
 `;

// Server Script

const mysql = require("mysql");

const db = mysql.createConnection({
  host: "sql7.freesqldatabase.com",
  user: "sql7370739",
  password: "nrdE5EPSi5",
  database: "sql7370739"
});

db.connect((err) => {
  if (err) {
    console.log("**Failed** to connect to server:" + err);
    return;
  }

  console.log("Connected to database");

  let queryTable = `CREATE TABLE IF NOT EXISTS 
                     players (id INT(5) NOT NULL AUTO_INCREMENT PRIMARY KEY, 
                     username VARCHAR(255), 
                     password VARCHAR(255))`;
  db.query(queryTable, (err, result) => {
    console.log("Created table if not existed:" + err);
  });
});

var express = require("express");
var app = express();
var serv = require("http").Server(app);

app.get("/", function (req, res) {
  res.send(htmlContent);
});

serv.listen(2000);
console.log("Server started.");

var SOCKET_LIST = {};

var isValidPassword = function (data, cb) {
  let query =
    "SELECT username, password FROM players WHERE username = '" +
    data.username +
    "' AND  password = '" +
    data.password +
    "'";

  db.query(query, (err, result) => {
    if (err) {
      console.log("isValidPassword:" + err);
      cb(true);
      return;
    }
    if (result.length > 0) cb(true);
    else cb(false);
  });
};
var isUsernameTaken = function (data, cb) {
  let usernameQuery =
    "SELECT * FROM players WHERE username = '" + data.username + "'";
  db.query(usernameQuery, (err, result) => {
    if (err) {
      console.log("isUsernameTake:" + err);
      cb(true);
      return;
    }
    if (result.length > 0) cb(true);
    else cb(false);
  });
};
var addUser = function (data, cb) {
  let query =
    "INSERT INTO players (username, password) VALUES ('" +
    data.username +
    "', '" +
    data.password +
    "')";

  db.query(query, (err, result) => {
    if (err) {
      console.log("addUser:" + err);
      cb(true);
      return;
    }
    cb(false);
  });
};

var io = require("socket.io")(serv, {});
io.sockets.on("connection", function (socket) {
  SOCKET_LIST[socket.id] = socket;
  //
  socket.on("signIn", function (data) {
    isValidPassword(data, function (res) {
      if (res) {
        socket.emit("signInResponse", { success: true });
      } else {
        socket.emit("signInResponse", { success: false });
      }
    });
  });
  socket.on("signUp", function (data) {
    isUsernameTaken(data, function (res) {
      if (res) {
        socket.emit("signUpResponse", { success: false });
      } else {
        addUser(data, function () {
          socket.emit("signUpResponse", { success: true });
        });
      }
    });
  });

  socket.on("sendMsgToServer", function (data) {
    var playerName = "" + socket.id.slice(2, 7);
    for (var i in SOCKET_LIST) {
      SOCKET_LIST[i].emit("addToChat", playerName + ": " + data);
    }
  });

  socket.on("disconnect", function () {
    delete SOCKET_LIST[socket.id];
  });
});
