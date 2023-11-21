const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const { log } = require('console');
const {spawn} = require('child_process');
const fs = require('fs');

const app = express();
app.use(cors());

var connection = mysql.createConnection({
      host: 'localhost',
      port: '3307',
      user: 'root',
      password: 'Aditya0406',
      database: 'icms2'
})

// const childPython = spawn('C:/Users/Aditya/miniconda3/envs/face/python', ['faces.py']);

function calculateDuration(startTime, endTime) {
  const startDateTime = new Date(startTime);
  const endDateTime = new Date(endTime);

  const durationInMilliseconds = endDateTime - startDateTime;

  // Convert duration to hours, minutes, and seconds
  const hours = Math.floor(durationInMilliseconds / (1000 * 60 * 60));
  const minutes = Math.floor((durationInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((durationInMilliseconds % (1000 * 60)) / 1000);

  // Format the duration as HH:MM:SS
  const formattedDuration = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return formattedDuration;
}

app.get("/", (req, res) => {
    let sql = "SELECT * FROM students";
    connection.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send(result);
    })
})

app.get("/loginInfo", (req, res) => {  
  const childPython = spawn('C:/Users/Aditya/miniconda3/envs/face/python', ['faces.py']);
  // node
  childPython.stdout.on('data', (data) => {
    res.send(data.toString());
  });

  childPython.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });
  childPython.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });

})

app.get("/login", (req, res) => {
  console.log(req.query);
  const  email  = req.query.email;
  const password  = req.query.password;
  console.log(email);  
  let sql = "SELECT * FROM students WHERE email_address = '" + email + "'";
  connection.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length > 0 && result[0].password === password) {
      // Email exists in the students table, user is logged in successfully
      res.send(result);
    } else {
      // Email does not exist in the students table, login failed
      res.send("Login failed. Email not found.");
    }
  });
});

app.get('/logout', (req, res) => {
  const welcome_message = "We are happy to see you again !";
  console.log(req.body);
  console.log(req.query);
  // res.send(req.body);
  // res.send(req.query);
var { student_id, login_time, logout_time } = req.query;
var session_time = calculateDuration(login_time, logout_time);

const sql = 'INSERT INTO login_information (student_id, login_time, logout_time, session_time, welcome_message) VALUES (' + student_id + ', "' + login_time + '", "' + logout_time + '", "' + session_time + '", "' + welcome_message + '")';

  // Execute the SQL query
  connection.query(sql, (error, results) => {
    if (error) {
      console.error('Error inserting data entry:', error);
      res.status(500).json({ error: 'An error occurred while inserting data entry' });
    } else {
      res.status(200).json({ session_time:session_time ,message: 'Data entry inserted successfully' });
    }
  });
});

app.get("/courseInfo", async (req, res) => {
  try {
    const studentId = req.query.student_id;

    const getCourseIds = () => {
      return new Promise((resolve, reject) => {
        const sql = "SELECT course_id FROM attends WHERE student_id = ?";
        connection.query(sql, [studentId], (err, result) => {
          if (err) reject(err);
          resolve(result);
        });
      });
    };

    const getCourseInfo = (courseId) => {
      return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM course WHERE course_id = ?";
        connection.query(sql, [courseId], (err, result) => {
          if (err) reject(err);
          resolve(result[0]);
        });
      });
    };

    const courseIds = await getCourseIds();

    const courseInfoPromises = courseIds.map((row) => {
      return getCourseInfo(row.course_id);
    });

    const courseInfo = await Promise.all(courseInfoPromises);

    res.send(courseInfo);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/timetable", async (req, res) => {
  try {
    const studentId = req.query.student_id;
    console.log(studentId)

    const getScheduleIds = () => {
      return new Promise((resolve, reject) => {
        const sql = "SELECT schedule_id FROM timetable WHERE student_id = ?";
        connection.query(sql, [studentId], (err, result) => {
          if (err) reject(err);
          resolve(result);
        });
      });
    };

    const getSchedules = (scheduleId) => {
      return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM courses_schedule WHERE schedule_id = ?";
        connection.query(sql, [scheduleId], (err, result) => {
          if (err) reject(err);
          resolve(result);
        });
      });
    };

    const courseIds = await getScheduleIds();

    const timetablePromises = courseIds.map((row) => {
      console.log(row);
      return getSchedules(row.schedule_id);
    });

    const timetable = await Promise.all(timetablePromises);
    console.log(timetable);
    const dataSource = timetable.map((row) => {
      return {
        key: row[0].schedule_id,
        text: row[0].course_id,
        startDate: new Date(row[0].course_start_date),
        endDate: new Date(row[0].course_end_date),
        recurrenceRule: row[0].recurrenceRule,
      };
    });

    res.send(dataSource);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});







app.listen(3001, () => {
        console.log("running on port 3001");
        connection.connect(function(err) {
                if (err) throw err;
                console.log("Connected!");
        });
})