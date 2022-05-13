# Projectname - C01

## Sprint Planning Meeting - October 6th, 2020

## Attendees:

Ali, Bhavya, Felix, Ivan, Jay, Kyle, Siddhant, Swarup, Ashraful

## Discussion Topics and Notes:

- Which features to do (login, landing page, sign up)
- Which is priority: looks or functionality.
- Problems faced usually lack of planning, difficult stack choice, always solidify
    plans and issues (advised by Scrum Master)
- Contact product owner regarding (choice of stories, stack, priorities (looks vs
    functionality), availability)
- The stories chosen are okay (Do something that you are comfortable with)
- Pre-recorded lectures instead of live is okay although both should be available if
    possible. (It doesn’t have to if you can’t)
- Tech stack is good for product owner
- Dark mode is a good feature
- Might be good to implement some possible Discord features since product owner
    really likes it (like office hours, group work, etc)
- Keep priority balanced but functionality is slightly more important
- Create a shared document that includes all decisions and why (stack choices,
    design choices, etc)

### Stack​:

Frontend - GatsbyJS, Redux, Axios
Backend - ExpressJS, PassportJS
Database - MongoDB
UI - Material-UI and Figma


## Spikes:

Majority of our members are new to some, or even all, of the technologies used in the
stack for our project. This includes Javascript, GatsbyJS, MongoDB, UI creation, and so
on. Each member is to take some time to get acquainted and comfortable with
implementing using the technologies required in their tasks during this sprint.

## Team Capacity:

Total story points to be done this sprint = 21 + 89 + 55 = ​ **165**

## Features to implement in sprint1:

### User Story #1:
C01-2: As a site visitor, I should be greeted with an intuitive landing page that makes it easy for me
to navigate the website. (21)

### Subtasks:
C01-18: Create an About page - Ali

C01-20: Implement NavBar - Ali

C01-21: Create Welcome/Home page - Felix

C01-22: Create Pricing page - Kyle

C01-23: Create Solutions page - Jay

C01-41 Create Footer - Ali

### User Story #2:
C01-​3: As an unregistered user, I should be able to sign up for an account so that I can fully utilize
the tools provided. (89)

### Subtasks:
C01-24: Create backend API to store credentials in db - Bhavya

C01-26: Create sign-up page - Felix

C01-28: Create and establish database connection - Bhavya

C01-29: Work on the passport config file - Sid

C01-31: Establish endpoints for getting users into the db - Bhavya

C01-32: Set up mongoDB server - Bhavya

C01-33: Establish MVC on the given directory structure (good design choice) - Ivan

C01-34: Hide database authentication information - Ivan

C01-35: Middleware to send requests to backend - Felix

C01-36: Use postman to test all the end-points - Ivan

### User Story #3:
C01-4: As a registered user, I am obligated to pass my credentials to login so that I can access the
system securely. (55)

### Subtasks:
C01-25: Create backend API to store credentials in db - Jay

C01-27: Create login page - Sid

C01-37: Creating an endpoint for logging in - Kyle

C01-38: Middleware to send requests to backend - Sid

C01-39: Use postman to test all the end-points - Jay

C01-40: Identify potential vulnerabilities in the code regarding login - Kyle

## Additional Tasks:

RPM.md and sprint1.md:
- Ivan

System Architecture and CRC Cards:
- Felix, Ivan, Kyle
