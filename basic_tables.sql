CREATE TABLE students (
    student_id INT AUTO_INCREMENT,
    name VARCHAR(100),
    email_address VARCHAR(100),
    password VARCHAR(100),
    PRIMARY KEY (student_id)
);
CREATE TABLE course (
    course_id VARCHAR(8),
    course_name TEXT,
    course_description TEXT,
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
CREATE TABLE courses_schedule (
    schedule_id INT AUTO_INCREMENT,
    course_id VARCHAR(8),
    course_start_date VARCHAR(255),
    course_end_date VARCHAR(255),
    recurrenceRule TEXT,
    classroom_address VARCHAR(255),
    PRIMARY KEY (schedule_id),
    FOREIGN KEY (course_id) REFERENCES course(course_id)
);
CREATE TABLE timetable (
    timetable_id INT AUTO_INCREMENT,
    student_id INT,
    schedule_id INT,
    PRIMARY KEY (timetable_id),
    FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (schedule_id) REFERENCES courses_schedule(schedule_id),
    UNIQUE KEY (student_id, schedule_id)
);
CREATE TABLE login_information (
    login_id INT AUTO_INCREMENT,
    student_id INT,
    login_time VARCHAR(255),
    logout_time VARCHAR(255),
    session_time VARCHAR(255),
    welcome_message VARCHAR(255) DEFAULT 'We are happy to see you again !',
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
