CREATE TABLE students (
    student_id INT AUTO_INCREMENT,
    name VARCHAR(100),
    email_address VARCHAR(100),
    PRIMARY KEY (student_id)
);
CREATE TABLE course (
    course_id VARCHAR(8),
    course_name TEXT,
    PRIMARY KEY (course_id)
);
CREATE Table attends(
    student_id INT,
    course_id VARCHAR(8),
    FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (course_id) REFERENCES course(course_id)
);
CREATE TABLE teacher_message (
    course_id VARCHAR(8),
    date_added DATETIME,
    message TEXT,
    FOREIGN KEY (course_id) REFERENCES course(course_id)
);

CREATE TABLE links_of_zoom (
    course_id VARCHAR(8),
    link VARCHAR(255),
    FOREIGN KEY (course_id) REFERENCES course(course_id)
);

CREATE TABLE tutorial_lecture_notes (
    note_id INT AUTO_INCREMENT,
    course_id VARCHAR(8),
    note TEXT,
    PRIMARY KEY (note_id),
    FOREIGN KEY (course_id) REFERENCES course(course_id)
);
CREATE TABLE course_schedule (
    course_id VARCHAR(8),
    course_start_time TIME,
    course_end_time TIME,
    course_day TEXT,
    FOREIGN KEY (course_id) REFERENCES course(course_id)
);
CREATE TABLE timetable (
    timetable_id INT AUTO_INCREMENT,
    student_id INT,
    schedule_id INT,
    PRIMARY KEY (timetable_id),
    FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (schedule_id) REFERENCES course_schedule(schedule_id),
    UNIQUE KEY (student_id, schedule_id)
);
CREATE TABLE login_information (
    login_id INT AUTO_INCREMENT,
    student_id INT,
    login_time DATETIME,
    logout_time DATETIME,
    welcome_message VARCHAR(255) DEFAULT 'Welcome back to our platform!',
    PRIMARY KEY (login_id),
    FOREIGN KEY (student_id) REFERENCES students(student_id)
);
CREATE TABLE face_recognition(
    recog_id INT AUTO_INCREMENT,
    student_id INT,
    file_path TEXT,
    PRIMARY KEY (recog_id),
    FOREIGN KEY (student_id) REFERENCES students(student_id)
);
