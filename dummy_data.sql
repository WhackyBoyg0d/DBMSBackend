INSERT INTO students VALUES
  (1, "Aditya", "aditya42@connect.hku.hk"),
  (2, "Aisan", "aazizi@connect.hku.hk"),
  (3, "Oliver", "odelano@connect.hku.hk"),
  (4, "Osman", "u3578258@connect.hku.hk");
INSERT INTO course VALUES
  ("COMP3278", "Introduction to Database Management Systems"),
  ("COMP3258", "Functional Programming"),
  ("ECON4211", "Advanced Microeconomics");
INSERT INTO attends VALUES
  (1, "COMP3278"),
  (2, "COMP3278"),
  (2, "COMP3258"),
  (3, "COMP3278"),
  (3, "ECON4211"),
  (4, "COMP3278");
INSERT INTO teacher_message VALUES
  ("COMP3278", "2023-11-01 14:00:23", "Remember to submit group project"),
  ("COMP3258", "2023-10-08 08:59:35", "Assignment 2 released");
INSERT INTO links_of_zoom VALUES
  ("COMP3278", "https://hku.zoom.us/j/98307568693?pwd=QmlqZERWeDdWRVZ3SGdqWG51YUtndz09");
INSERT INTO tutorial_lecture_notes VALUES
  (1, "COMP3278", "This is a dummy notes");
INSERT INTO course_schedule VALUES
  (1, "COMP3278", "143000", "152000", "Monday"),
  (2, "COMP3278", "133000", "152000", "Thursday"),
  (3, "COMP3258", "093000", "122000", "Friday"),
  (4, "ECON4211", "143000", "172000", "Friday");
INSERT INTO timetable VALUES
  (1, 1, 1),
  (2, 1, 2),
  (3, 2, 1),
  (4, 2, 2),
  (5, 2, 3);
INSERT INTO login_information VALUES
  (1, 1, "2023-11-10 23:12:59", "2023-11-10 23:25:02", "Hello"),
  (2, 4, "2023-11-10 23:12:59", "2023-11-10 23:25:02", "Hello");
INSERT INTO face_recognition VALUES
  (1, 1, "filepath");
