CREATE TABLE students (
    student_id INT AUTO_INCREMENT,
    name VARCHAR(100),
    email_address VARCHAR(100),
    PRIMARY KEY (student_id)
);
CREATE TABLE course (
    course_id INT AUTO_INCREMENT,
    PRIMARY KEY (course_id)
);
CREATE Table attends(
    student_id INT,
    course_id INT,
    FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (course_id) REFERENCES course(course_id)
);
CREATE TABLE teacher_message (
    message_id INT AUTO_INCREMENT,
    course_id INT,
    message TEXT,
    PRIMARY KEY (message_id),
    FOREIGN KEY (course_id) REFERENCES course(course_id)
);

CREATE TABLE links_of_zoom (
    link_id INT AUTO_INCREMENT,
    course_id INT,
    link VARCHAR(255),
    PRIMARY KEY (link_id),
    FOREIGN KEY (course_id) REFERENCES course(course_id)
);

CREATE TABLE tutorial_lecture_notes (
    note_id INT AUTO_INCREMENT,
    course_id INT,
    note TEXT,
    PRIMARY KEY (note_id),
    FOREIGN KEY (course_id) REFERENCES course(course_id)
);
CREATE TABLE course_schedule (
    schedule_id INT AUTO_INCREMENT,
    course_id INT,
    course_time TIME,
    course_date DATE,
    PRIMARY KEY (schedule_id),
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
