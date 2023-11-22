INSERT INTO students VALUES
  (1, "Aditya", "aditya42@connect.hku.hk", "XyZ78$Abc"),
  (2, "Aisan", "aazizi@connect.hku.hk", "P@ssw0rd#42"),
  (3, "Oliver", "odelano@connect.hku.hk", "SecurePass!99"),
  (4, "Osman", "u3578258@connect.hku.hk", "R3nd0mP@55");
INSERT INTO course VALUES
  ("COMP3278", "Introduction to Database Management Systems", "This course studies the principles, design, administration, and implementation of database management systems. Topics include: entity-relationship model, relational model, relational algebra, database design and normalization, database query languages, indexing schemes, integrity and concurrency control."),
  ("COMP3258", "Functional Programming", "The course teaches the basics of functional programming using the language Haskell. The main goal is introduce students to fundamental programming concepts such as recursion, abstraction, lambda expressions and higher-order functions and data types. The course will also study the mathematical reasoning involved in the design of functional programs and techniques for proving properties about functions so defined. With the adoption of lambda expressions recent versions of Java, C++ or C#, functional programming and related programming techniques are becoming increasingly more relevant even for programmers of languages that are not traditionally viewed as functional. This course is important to introduce students to such techniques."),
  ("ECON4211", "Advanced Microeconomics", "This course is designed to provide students with the analytical tools required to study economic decisions and strategic behavior at an advanced level. It covers decision theory, game theory, and mechanism design. The course is particularly recommended for students who are considering graduate study in economics."),
  ("STAT3907", "Linear Models and Forecasting", " 	This course deals with applied statistical methods of linear models and investigates various forecasting procedures through using linear models and time series analysis."),
  ("FINA4354", "Financial Engineering", "Financial engineering is the process of constructing new instruments by using bonds and individual derivatives such as forwards, calls, puts, and exotic options as basic building blocks. The process involves designing, pricing, and managing the instruments. In this course, we anatomize a few popular structured products. We then discuss how to price these products by studying the price of the embedded exotic options. We study the risk exposure of the investors and the risk management of the issuer. We also discuss some topics on the market for volatility trading, numerical methods for option-pricing, and models beyond Black-Scholes."),
  ("COMP3314", "Machine Learning", "This course introduces algorithms, tools, practices, and applications of machine learning. Topics include core methods such as supervised learning (classification and regression), unsupervised learning (clustering, principal component analysis), Bayesian estimation, neural networks; common practices in data pre-processing, hyper-parameter tuning, and model evaluation; tools/libraries/APIs such as scikit-learn, Theano/Keras, and multi/many-core CPU/GPU programming. "),
  ("CHEM4342", "Organometallic Chemistry", "To give further, more detailed, treatment to organometallic chemistry mentioned in CHEM3341 Inorganic Chemistry II.  The course also aims to introduce and familiarize students with advanced laboratory techniques, and to prepare students for graduate work in inorganic and organometallic chemistry. "),
  ("CHEM4443", "Integrated Organic Synthesis", " 	To introduce aspects of modern organic reactions with relevance to and in the context of the synthesis of natural products, drugs and medicinal chemistry to provide an integrated approach to the subject, and to provide training in advanced organic laboratory skills, and further hands-on experience in synthesis and characterization, as preparation for graduate studies or research in organic chemistry. ");
INSERT INTO attends VALUES
  (1, "COMP3278"),
  (1, "COMP3258"),
  (1, "STAT3907"),
  (1, "CHEM4342"),
  (1, "CHEM4443"),
  (2, "COMP3278"),
  (2, "COMP3258"),
  (2, "COMP3314"),
  (2, "CHEM4443"),
  (3, "COMP3278"),
  (3, "ECON4211"),
  (3, "FINA4354"),
  (4, "COMP3278"),
  (4, "FINA4354"),
  (4, "STAT3907");
INSERT INTO teacher_message VALUES
  ("COMP3278", "2023-11-01 14:00:23", "Remember to submit group project"),
  ("COMP3278", "2023-11-20 21:21:21", "Group project presentation arrangement released"),
  ("COMP3258", "2023-10-08 08:59:35", "Assignment 2 released"),
  ("ECON4211", "2023-10-08 08:59:35", "Assignment 4 released"),
  ("CHEM4342", "2023-11-22 23:21:42", "Laboratory report due next Thursday 30 Nov"),
  ("ECON4211", "2023-11-22 19:57:23", "I wanted to let you know that I've uploaded a few practice questions for the final. This is a substitute for the third problem set though you don't have to submit your answers");
INSERT INTO links_of_zoom VALUES
  ("COMP3278", "https://hku.zoom.us/j/98307568693?pwd=QmlqZERWeDdWRVZ3SGdqWG51YUtndz09"),
  ("COMP3258", "https://hku.zoom.us/j/98307568693?pwd=QmlqZERWeDdWRVZ3SGdqWG51YUtndz09"),
  ("ECON4211", "https://hku.zoom.us/j/98307568693?pwd=QmlqZERWeDdWRVZ3SGdqWG51YUtndz09");
INSERT INTO tutorial_lecture_notes VALUES
  (1, "COMP3278", "This is a dummy notes"),
  (2, "COMP3258", "This is a dummy notes"),
  (3, "ECON4211", "https://www.cliffsnotes.com/study-guides/economics/introduction/economic-analysis"),
  (4, "STAT3907", "This is a dummy notes"),
  (5, "FINA4354", "https://personal.ntu.edu.sg/nprivault/MA5182/barrier-options.pdf");
INSERT INTO courses_schedule VALUES
  (1, "COMP3278", "2023-11-20T14:30:00.000+0800", "2023-11-20T15:20:00.000+0800", "FREQ=WEEKLY;BYDAY=MO;COUNT=20", "MWT1"),
  (2, "COMP3278", "2023-11-23T13:30:00.000+0800", "2023-11-23T15:20:00.000+0800", "FREQ=WEEKLY;BYDAY=TH;COUNT=20", "RHT"),
  (3, "COMP3258", "2023-11-24T09:30:00.000+0800", "2023-11-24T12:20:00.000+0800", "FREQ=WEEKLY;BYDAY=FR;COUNT=20", "KBB23"),
  (4, "ECON4211", "2023-11-24T14:30:00.000+0800", "2023-11-24T17:20:00.000+0800", "FREQ=WEEKLY;BYDAY=FR;COUNT=20", "CYCP1"),
  (5, "ECON4211", "2023-11-21T22:30:00.000+0800", "2023-11-20T23:20:00.000+0800", "FREQ=WEEKLY;BYDAY=TU;COUNT=20", "CYCP2"),
  (6, "COMP3278", "2023-11-22T01:30:00.000+0800", "2023-11-22T03:20:00.000+0800", "FREQ=WEEKLY;BYDAY=WE;COUNT=20", "RHT"),
  (7, "COMP3258", "2023-11-22T05:00:00.000+0800", "2023-11-22T06:20:00.000+0800", "FREQ=WEEKLY;BYDAY=WE;COUNT=20", "CPD2"),
  (8, "STAT3907", "2023-11-24T09:30:00.000+0800", "2023-11-24T12:20:00.000+0800", "FREQ=WEEKLY;BYDAY=FR;COUNT=20", "KKLG01"),
  (9, "CHEM4443", "2023-11-23T10:30:00.000+0800", "2023-11-23T13:20:00.000+0800", "FREQ=WEEKLY;BYDAY=TH;COUNT=20", "CYCP1")  ;

INSERT INTO timetable VALUES
  (1, 1, 1),
  (2, 1, 2),
  (3, 2, 1),
  (4, 2, 2),
  (5, 2, 3),
  (6, 3, 1),
  (7, 3, 2),
  (8, 3, 4),
  (9, 4, 1),
  (10, 4, 2),
  (11, 3, 5),
  (12, 2, 6),
  (13, 1, 7),
  (14, 1, 8),
  (15, 1, 9);

INSERT INTO face_recognition VALUES
  (1, 1, "filepath");
