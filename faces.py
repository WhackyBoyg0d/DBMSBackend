import email
import urllib
import numpy as np
import mysql.connector
import cv2
import pyttsx3
import pickle
from datetime import datetime
import json



import sys

# 1 Create database connection
myconn = mysql.connector.connect(host='localhost',
                                 port='3307',
                                 user='root',
                                 password='Aditya0406',
                                 database='icms2')
date = datetime.utcnow()
now = datetime.now()
current_time = now.strftime("%H:%M:%S")
cursor = myconn.cursor()


#2 Load recognize and read label from model
recognizer = cv2.face.LBPHFaceRecognizer_create()
recognizer.read("train.yml")

labels = {"person_name": 1}
with open("labels.pickle", "rb") as f:
    labels = pickle.load(f)
    labels = {v: k for k, v in labels.items()}

# create text to speech
engine = pyttsx3.init()
rate = engine.getProperty("rate")
engine.setProperty("rate", 175)

# Define camera and detect face
face_cascade = cv2.CascadeClassifier('haarcascade/haarcascade_frontalface_default.xml')
cap = cv2.VideoCapture(0)
a = 1
# 3 Open the camera and start face recognition
while a == 1:
    ret, frame = cap.read()
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.5, minNeighbors=5)

    for (x, y, w, h) in faces:
        # print(x, w, y, h)
        roi_gray = gray[y:y + h, x:x + w]
        roi_color = frame[y:y + h, x:x + w]
        # predict the id and confidence for faces
        id_, conf = recognizer.predict(roi_gray)

        # If the face is recognized
        if conf >= 50:
            # print(id_)
            # print(labels[id_])
            # print("test", sys.argv)
            font = cv2.QT_FONT_NORMAL
            id = 0
            id += 1
            name = labels[id_]
            current_name = name
            color = (255, 0, 0)
            stroke = 2
            cv2.putText(frame, name, (x, y), font, 1, color, stroke, cv2.LINE_AA)
            cv2.rectangle(frame, (x, y), (x + w, y + h), (255, 0, 0), (2))

            # Find the student's information in the database.
            select = "SELECT email_address, password FROM Students WHERE name='%s'" % (name)
            studentInfo = cursor.execute(select)
            result = cursor.fetchall()

            data = "error"

            for x in result:
                data = x

            # If the student's information is not found in the database
            if data == "error":
                print("The student", current_name, "is NOT FOUND in the database.")

            # If the student's information is found in the database
            else:
                """
                Implement useful functions here.
                Check the course and classroom for the student.
                    If the student has class room within one hour, the corresponding course materials
                        will be presented in the GUI.
                    if the student does not have class at the moment, the GUI presents a personal class 
                        timetable for the student.

                """
                # Update the data in database
                # update =  "UPDATE Student SET login_date=%s WHERE name=%s"
                # val = (date, current_name)
                # cursor.execute(update, val)
                # update = "UPDATE Student SET login_time=%s WHERE name=%s"
                # val = (current_time, current_name)
                # cursor.execute(update, val)
                # myconn.commit()
                email1 = str(result[0][0])
                password1 = str(result[0][1])
                data = {'email': email1, 'password': password1}
                json_string = json.dumps(data)
                print(json_string)
                engine.say(json_string)
                a = 2
                # engine.runAndWait()


        # If the face is unrecognized
        else: 
            color = (255, 0, 0)
            stroke = 2
            font = cv2.QT_FONT_NORMAL
            cv2.putText(frame, "UNKNOWN", (x, y), font, 1, color, stroke, cv2.LINE_AA)
            cv2.rectangle(frame, (x, y), (x + w, y + h), (255, 0, 0), (2))
            hello = ("Your face is not recognized")
            print(hello)
            engine.say(hello)
            # engine.runAndWait()

    cv2.imshow('Facial Recognition', frame)
    k = cv2.waitKey(20) & 0xff
    if k == ord('q'):
        break
        
cap.release()
cv2.destroyAllWindows()
