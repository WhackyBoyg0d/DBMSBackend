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

function results(lecture)  { lecture.map(dateString => {
  const currentDate = new Date(); // Get the current date and time
    const date = new Date(dateString.startDate); // Parse the date from the array

    // Check if the date is on the same day as today
    if (
      date.getDate() === currentDate.getDate() &&
      date.getMonth() === currentDate.getMonth() &&
      date.getFullYear() === currentDate.getFullYear()
    ) {
      // Calculate the time difference in milliseconds
      const timeDiff = Math.abs(date.getTime() - currentDate.getTime());

      // Check if the time difference is within 1 hour (3600000 milliseconds)
      if (timeDiff <= 3600000) {
        return dateString;
      } else {
        
      }
    } else {
      
    }
    return null;
  })};

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

    // const getZoomLink = (courseId) => {
    //   return new Promise((resolve, reject) => {
    //     const sql = "SELECT * FROM links_of_zoom WHERE course_id = ?";
    //     connection.query(sql, [courseId], (err, result) => {
    //       if (err) reject(err);
    //       resolve(result[0]);
    //     });
    //   });
    // }

    // const teacherMessage = (courseId) => {
    //   return new Promise((resolve, reject) => {
    //     const sql = "SELECT * FROM teacher_message WHERE course_id = ?";
    //     connection.query(sql, [courseId], (err, result) => {
    //       if (err) reject(err);
    //       resolve(result[0]);
    //     });
    //   });
    // }

    // const tutorialLectureNotes = (courseId) => {
    //   return new Promise((resolve, reject) => {
    //     const sql = "SELECT * FROM tutorial_lecture_notes WHERE course_id = ?";
    //     connection.query(sql, [courseId], (err, result) => {
    //       if (err) reject(err);
    //       resolve(result[0]);
    //     });
    //   });
    // }


    
    const courseIds = await getScheduleIds();

    const timetablePromises = courseIds.map((row) => {
      console.log(row);
      return getSchedules(row.schedule_id);
    });

    const timetable = await Promise.all(timetablePromises);
    // console.log(timetable);
    // const infoo = timetable.map(async (row) => {
    //   console.log(row[0].course_id)
    //   const zoom_link = await getZoomLink(row[0].course_id);
    //   const teacher_message = await teacherMessage(row[0].course_id);
    //   const tutorial_lecture_notes = await tutorialLectureNotes(row[0].course_id);
    //   return {
    //     key: row[0].schedule_id,
    //     zoom_link: zoom_link,
    //     teacher_message: teacher_message,
    //     tutorial_lecture_notes: tutorial_lecture_notes
    //   };
    // });

    // console.log(infoo);

    const dataSource = timetable.map( (row, index) => {
      return {
        key: row[0].schedule_id,
        text: row[0].course_id,
        startDate: new Date(row[0].course_start_date),
        endDate: new Date(row[0].course_end_date),
        recurrenceRule: row[0].recurrenceRule,
        description: "Location - " + row[0].classroom_address,

      };
    });
    console.log(dataSource);

    res.send(dataSource);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// app.get("/moreLectureInfo", async (req, res) => {
//   const courseId = req.query.course_id;
//   console.log(courseId);
//   var zoom_link = "";
//   var teacher_message = "";
//   var tutorial_lecture_notes = "";
//   let sql = "SELECT link FROM links_of_zoom WHERE course_id = ?";
//   connection.query(sql, [courseId], (err, result) => {
//     if (err) throw err;
//     console.log(result[0]);
//     zoom_link = result[0].link;
//   });
//   sql = "SELECT message FROM teacher_message WHERE course_id = ?";
//   connection.query(sql, [courseId], (err, result) => {
//     if (err) throw err;
//     console.log(result[0]);
//     teacher_message = result[0].message;
//   });
//   sql = "SELECT note FROM tutorial_lecture_notes WHERE course_id = ?";
//   connection.query(sql, [courseId], (err, result) => {
//     if (err) throw err;
//     console.log(result[0]);
//     tutorial_lecture_notes = result[0].notes;
//   });
//   setTimeout(() => {}, 1000);
//   const info = {
//     zoom_link: zoom_link,
//     teacher_message: teacher_message,
//     tutorial_lecture_notes: tutorial_lecture_notes
//   };
//   console.log(info);
//   res.send(info);

// });

app.get("/moreLectureInfo", async (req, res) => {
  const courseId = req.query.course_id;
  console.log(courseId);

  try {
    const zoomLinkPromise = new Promise((resolve, reject) => {
      const sql = "SELECT link FROM links_of_zoom WHERE course_id = ?";
      connection.query(sql, [courseId], (err, result) => {
        if (err) reject(err);
        resolve(result[0]?.link || '');
      });
    });

    const teacherMessagePromise = new Promise((resolve, reject) => {
      const sql = "SELECT message FROM teacher_message WHERE course_id = ?";
      connection.query(sql, [courseId], (err, result) => {
        if (err) reject(err);
        resolve(result[0]?.message || '');
      });
    });

    const tutorialLectureNotesPromise = new Promise((resolve, reject) => {
      const sql = "SELECT note FROM tutorial_lecture_notes WHERE course_id = ?";
      connection.query(sql, [courseId], (err, result) => {
        if (err) reject(err);
        resolve(result[0]?.note || '');
      });
    });

    const [zoomLink, teacherMessage, tutorialLectureNotes] = await Promise.all([
      zoomLinkPromise,
      teacherMessagePromise,
      tutorialLectureNotesPromise,
    ]);

    const info = {
      zoom_link: zoomLink,
      teacher_message: teacherMessage,
      tutorial_lecture_notes: tutorialLectureNotes,
    };

    console.log(info);
    res.send(info);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// app.get("/latestClass", async (req, res) => {
//   try {
//     const studentId = req.query.student_id;
//     console.log(studentId)

//     const getScheduleIds = () => {
//       return new Promise((resolve, reject) => {
//         const sql = "SELECT schedule_id FROM timetable WHERE student_id = ?";
//         connection.query(sql, [studentId], (err, result) => {
//           if (err) reject(err);
//           resolve(result);
//         });
//       });
//     };

//     const getSchedules = (scheduleId) => {
//       return new Promise((resolve, reject) => {
//         const sql = "SELECT * FROM courses_schedule WHERE schedule_id = ?";
//         connection.query(sql, [scheduleId], (err, result) => {
//           if (err) reject(err);
//           resolve(result);
//         });
//       });
//     };

//     const getZoomLink = (courseId) => {
//       return new Promise((resolve, reject) => {
//         const sql = "SELECT link FROM links_of_zoom WHERE course_id = ?";
//         connection.query(sql, [courseId], (err, result) => {
//           if (err) reject(err);
//           resolve(result[0]);
//         });
//       });
//     }

//     const teacherMessage = (courseId) => {
//       return new Promise((resolve, reject) => {
//         const sql = "SELECT message FROM teacher_message WHERE course_id = ?";
//         connection.query(sql, [courseId], (err, result) => {
//           if (err) reject(err);
//           resolve(result[0]);
//         });
//       });
//     }

//     const tutorialLectureNotes = (courseId) => {
//       return new Promise((resolve, reject) => {
//         const sql = "SELECT notes FROM tutorial_lecture_notes WHERE course_id = ?";
//         connection.query(sql, [courseId], (err, result) => {
//           if (err) reject(err);
//           resolve(result[0]);
//         });
//       });
//     }

//     const courseIds = await getScheduleIds();

//     const timetablePromises = courseIds.map((row) => {
//       console.log(row);
//       return getSchedules(row.schedule_id);
//     });

//     const timetable = await Promise.all(timetablePromises);
//     const dataSource = timetable.map(async (row) => {
//       const zoom_link = await getZoomLink(row[0].course_id);
//       const teacher_message = await teacherMessage(row[0].course_id);
//       const tutorial_lecture_notes = await tutorialLectureNotes(row[0].course_id);
//       return {
//         key: row[0].schedule_id,
//         text: row[0].course_id,
//         startDate: new Date(row[0].course_start_date),
//         endDate: new Date(row[0].course_end_date),
//         recurrenceRule: row[0].recurrenceRule,
//         description: row[0].classroom_address,
//         zoom_link: zoom_link,
//         teacher_message: teacher_message,
//         tutorial_lecture_notes: tutorial_lecture_notes
//       };
//     });
//     console.log(dataSource);

//     res.send(results(dataSource));
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Internal Server Error");
//   }
// });







app.listen(3001, () => {
        console.log("running on port 3001");
        connection.connect(function(err) {
                if (err) throw err;
                console.log("Connected!");
        });
})