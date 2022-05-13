# Projectname - C01

## Sprint Planning Meeting - October 20th, 2020

## Attendees:

Ali, Bhavya, Felix, Ivan, Jay, Kyle, Siddhant

## Discussion Topics and Notes:

- Breaking up subtasks and grouping them

- Storing PDFs in database

### Stack​:

Frontend - GatsbyJS, Redux, Axios
Backend - ExpressJS, PassportJS
Database - MongoDB
UI - Material-UI and Figma


## Spikes:

Tasks that involves unfamiliar stack to the assigned person.

## Team Capacity:

Total story points to be done this sprint = 55 + 89 + 144 + 144 = ​ **432**

## Features to implement in sprint2:

### User Story #1:

As an impact learner, I want to be able to apply to volunteer positions in the Giving Garden so that I can get working experience. (55) (1 person) (Kyle)

### Subtasks:

Add additional field for Job to include job posting link

Update the job list in organization page to include link where user can apply

Remove applied/employed schema since no need

### User Story #2:

As an impact learner, I should be able to register in any course that I am qualified for and gain access to the learning materials once I register so that I can view and read the course offerings. (89) (2 persons) (Ivan + Ali)

### Subtasks:

Axios calls for getting userId and classId into the enrolled schema (Ali)

Create Backend endpoints for Creating/Retrieving enrolled schema (Ali)

Update the “enroll” button in explore classes and class template (Ivan)

Make lecture materials in class template only available if user is “enrolled” (Ivan)

Update student dashboard dynamically to include “enrolled” courses (Ivan)

### User Story #3:

As an impact consultant, I want to be able to put my course content onto the website so that students can access it.(144) (2 persons) (Jay + Bhavya)

### Subtasks:

Create the page for putting materials to the course

Create a schema for lecture materials (list of links maybe?)

Create Schema for assignments

Axios calls for lecture materials to connect to backend

Axios calls for assignments to connect to backend

Create Backend endpoints for Creating/Retrieving lecture materials

Create Backend endpoints for Creating/Retrieving assignments

Create a File system for storing and retrieving assignment files?

### User Story #4:

As an impact learner, I should be able to submit my work for grading so that my instructor can mark it.(144) (Sid + Felix)

### Subtasks:

Create submit assignment page

Create a schema for assignment submission

Axios calls for assignments to connect to backend

Create Backend endpoints for Creating/Retrieving assignments submitted by the student

Create a File system for storing and retrieving assignment submissions files?

### Side tasks: 

Connect dashboard to backend - Felix

Search bar - Jay

Fix Create Job - Sid
