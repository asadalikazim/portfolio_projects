# Projectname - C01

## Sprint Planning Meeting - October 20th, 2020

## Attendees:

Ali, Bhavya, Felix, Ivan, Jay, Kyle, Siddhant

## Discussion Topics and Notes:

- Breaking up subtasks and grouping them

- Discussion of Dashboard design

### Stack​:

Frontend - GatsbyJS, Redux, Axios
Backend - ExpressJS, PassportJS
Database - MongoDB
UI - Material-UI and Figma


## Spikes:

Redux and any other tasks that involves unfamiliar stack to the assigned person.

## Team Capacity:

Total story points to be done this sprint = 89 + 233 + 144 = ​ **466**

## Features to implement in sprint2:

### User Story #1:
C01-6 As an impact learner, I should be able to see and browse relevant courses and read their descriptions in one place so I can better choose which courses to partake in. (89)

### Subtasks:

Make Collapsible Left Navigation Bar for STUDENT

Make Dashboard page for STUDENT

Create an "Explore Opportunities" page for Student

Implement Top Bar for logged in users

Create an "Explore Classes" page for student

### User Story #2:
C01-12 As an impact consultant, I want to be able to create a class and upload my course materials so that students can enroll in my course. (233)

### Subtasks:

Make dashboard for CONSULTANT

Create frontend controllers for classes

Create the "Landing Page" template page for each class

Page for creating a new class

Create endpoints to get User, Organization, Jobs

Make schema for classes

Create backend end-point for added course information

Make back-end endpoints to connect to backend

Make collapsible left nav bar for Consultant

### User Story #3:
C01-16 As an impact organization, I want to be able to post a volunteer/job posting so that I can hire students or consultants. (144)

### Subtasks:

Make the dashboard for INITIATIVE

Create frontend controllers for opportunities

Make back-end end points to connect to backend

Create the landing page template for organization

Page for creating the organization for INITIATIVE

Page for adding jobs to the organization page

Create backend end-points for creating an organization

Make schema for Jobs

Create backend endpoints for added job information into db

Make collapsible left nav bar for INITIATIVE

## Task Groupings and Assigned Person(s)

### Group 1 (Backend/Database): Kyle and Sid

Make back-end end-points to connect to backend to retrieve jobs posted

Make back-end end-ponts to connect to backend to retrieve classes posted

Create backend end-point for added course information into database

Create backend end-point for added job information into database

Making the schema for classes

Making the schema for jobs

### Group 2 (Top Navigation Bar & Top search Bar): Jay

Make Top Navigation Bar for STUDENT

Make Top Navigation Bar for CONSULTANT

Make Top Navigation Bar for INITIATIVE

Implement Top search Bar for logged in users.

### Group 3 (Dashboard): Felix

Make the dashboard for STUDENT

Make the dashboard for INITIATIVE

Make the dashboard for CONSULTANT

### Group 4 (frontend controllers/Axios calls): Ali and Sid

Create frontend controllers for classes (public classes). This should retrieve/add all classes data from the database to be displayed

Create frontend controllers for opportunities. This should retrieve/add all classes data from the database to be displayed
(this also includes mapping the data to the local repo i.e. redux store from which the UI accesses it)
	
### Group 5 (Landing/Descriptive pages)): Ivan

Create the “Landing Page” page for each class. (Make available “Enrol” button and assignments only to logged in users). Create a template since all classes will have the same format.

Create the “Landing Page” page for each opportunity. Create template since all opportunities will have same format

### Group 6 (UI Pages)): Bhavya

Create an “Explore Classes” page for Student

Create an “Explore Opportunities” page for Student

Page for creating a new class for Consultant (to get required information to fill the Class schema)

Page for creating the organization page for Initiative (to get required information to fill the Organization schema)

Page for adding jobs to the organization page (to get required information to fill the Job schema)

