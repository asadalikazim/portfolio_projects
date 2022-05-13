# Projectname - C01

## Sprint Planning Meeting - October 20th, 2020

## Attendees:

Ali, Bhavya, Felix, Ivan, Jay, Kyle, Siddhant

## Discussion Topics and Notes:

- Breaking up subtasks and grouping them

### Stack​:

Frontend - GatsbyJS, Redux, Axios
Backend - ExpressJS, PassportJS
Database - MongoDB
UI - Material-UI and Figma


## Spikes:

Tasks that involves unfamiliar stack to the assigned person.

## Team Capacity:

Total story points to be done this sprint = 55 + 89 + 89 + 144 + 55= ​ **432**

## Features to implement in sprint4:

### User Story #1:

As an impact consultant, I want to be able to assess and grade my students’ submissions so that they can receive an appropriate grading score. (89) (2 persons) (Sid + Ali)

### Subtasks:

Create backend endpoints for retrieving all submissions for an assignment

Create a page where a consultant can update the grades of students per assignment. (updates are visible to consultant)

Create axios calls for updating submissions

### User Story #2:

As an impact learner, I want to be able to request free class enrollment through the giving garden so that I can enroll in a course I like if I'm low on funds. (89) (Ivan + Kyle + Bhavya)

### Subtasks:

Update the class template to include an apply button
	
Create schema for giving garden class request submissions

Create axios calls for request submissions

Create page for user to submit a requests (to fill in the schema)

Create request Schema for applying to giving garden

create backend end-points for creating student giving garden requests

### User Story #3:

As an impact organization, I want to be able to request a free consultancy session on the giving garden page so that I can get support even if I'm low on funds. (89) (Ivan + Kyle + Bhavya)

### Subtasks:

Update so impact organizations can browse through classes

Create schema for giving garden class request submissions

Create axios calls for request submissions

Create page for user to submit a requests (to fill in the schema)

### User Story #4:

As an impact consultant, I should be able to accept or reject requests for free classes/consultancy sessions so I can better manage my tasks.(144) (Bhavya + Jay + Kyle)

### Subtasks:

Create endpoints for giving garden requests for accepting/rejecting requests and querying for each type of request

Create axios calls for teachers to accept/reject requests for classes

Create a page for accepting/rejecting requests

Add Requests to nav bar

### User Story #5:

As an impact learner, I want to view the classes I am enrolled in, in my dashboard so I can access them easily. (55) (Sid + Felix)

### Subtasks:

Create backend endpoints

Create axios calls to retrieve enrolled classes

Update the dashboard for dynamic rendering

### Side Tasks:

Consider Redesign / Refactor / Dark mode
