# Magnify

### Team Members
Abhishek Chatterjee, Asad Ali Kazim, Tien Thanh Le

### Description of web application
We are building a video conferencing web platform that is entirely self-contained in a browser. It would support a basic set of features for individual users, such as hosting calls that can support up to 30 users concurrently. Furthermore, for organizations, we add additional features such as multiple concurrent calls, each of which can host unlimited users, along with call reminder notifications, group invite links, calendar integration, chat logs and conference call recordings.

### Features complete by the beta version
* Full support for individuals hosting calls for up to 30 people
* Chat support
* Chat logs / Conference VODs 
* User and Organisation authentication

### Additional features completed by the final version
* Support for organizations hosting multiple calls concurrently
* Reminder notifications for upcoming calls
* Automated sending of invite links to all participants
* Calendar integration of upcoming calls

### Tech stack
* Frontend: React with Material UI + Redux for state management
* Data exchange: GraphQL
* Backend: NodeJs Express
* Persistence Layer:
    * MongoDB    
    * S3 bucket for chat logs and conference recordings

### Top 5 technical challenges
* Managing concurrent calls, each comprising of multiple users
* Supporting large numbers of users on a call
* Responsive and well-designed UI.
* Storing lots of data ie. long videos and large chat logs
* Managing different type of users and their respective authorization

