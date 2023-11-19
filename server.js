const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());

var connection = mysql.createConnection({
      host: 'localhost',
      port: '3307',
      user: 'root',
      password: 'Aditya0406',
      database: 'icms'
})

app.get("/", (req, res) => {
    let sql = "SELECT * FROM students";
    connection.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send(result);
    })
})

app.get("/login", (req, res) => {
  console.log(req.query);
  const  email  = req.query.email;
  console.log(email);  
  let sql = "SELECT * FROM students WHERE email_address = '" + email + "'";
  connection.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      // Email exists in the students table, user is logged in successfully
      res.send(result);
    } else {
      // Email does not exist in the students table, login failed
      res.send("Login failed. Email not found.");
    }
  });
});



app.listen(3001, () => {
        console.log("running on port 3001");
        connection.connect(function(err) {
                if (err) throw err;
                console.log("Connected!");
        });
})