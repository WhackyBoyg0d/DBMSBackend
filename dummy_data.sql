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
  (2, "COMP3258");
INSERT INTO teacher_message VALUES
  ("COMP3278", "20231101", "Remember to submit group project"),
  ("COMP3258", "20231008", "Assignment 2 released");
INSERT INTO links_of_zoom VALUES
  ("COMP3278", "https://hku.zoom.us/j/98307568693?pwd=QmlqZERWeDdWRVZ3SGdqWG51YUtndz09");


INSERT INTO course_schedule VALUES
  ("COMP3278", "143000", "152000", "Monday"),
  ("COMP3278", "133000", "152000", "Thursday");
