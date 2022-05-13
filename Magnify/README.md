# Magnify

## Project URL

https://www.magnify.social/

## Project Video URL

**Task:** Provide the link to your youtube video. Please make sure the link works.

## Project Description

This a free to use app for video calling and chatting with your friends! It works completely in the browser without any need for download. You can also record your meetings and save them on your local file system. Further, if you and your friends sign up you can schedule meetings in the future and we will mail everyone an invite!

## Development

- The app follows the micro-services architecture.
- The "Magnify Frontend" is written in NextJS and TypeScript, makes use of out-of-the-box UI elements from ChakraUI, and uses Apollo to make API calls.
- The "Magnify Backend" is written in NestJS and TypeScript, uses Helmet for api call sanitation, and uses "node-fetch" for microservice calls.
- There is a lightweight "Mailing Server" written in Express which is used to mail invites to registered users upon a meeting being scheduled. NodeMailer is used to mail invites, and iCal-Generator is used to create them.
- The PeerJS and SocketIO libraries are relied on heavily throughout the architecture to enable efficient use of WebRTC technologies and enabling chat capabilities.
- There is a STUN server called "Peer Server" written in ExpressJS to aid PeerJS functionality.
- The database being used to store registered users is MongoDB, and Mongoose is used as an Object Data Modelling interface for MongoDB.
- All API endpoints throughout the product are GraphQL endpoints.

## Deployment

**Task:** Explain how you have deployed your application.

## Maintenance

The app has been thoroughly manually tested. Further, backend errors are logged automatically by NestJS and if we keep up with the logs we can identify and fix any errors that arise post deployment.

## Challenges

Top 3 most challenging things that we have developed for our app / learned from developing our app:

1. Dockerizing and Deploying
2. PeerJS/WebRTC and SocketIO technologies
3. Designing and deciding on a good architecture for the entire product

## Contributions

- Abhishek Chatterjee initially worked on setting up a demo on PeerJS and SocketIO to familiarise the entire team with the WebRTC technology. He further worked on conference recording and saving to local user filesystem. He also has been key to upgrading and debuggifying the frontend.
- Asad Ali Kazim worked on integrating the PeerJS demo with NextJS, creating a chat system using sockets, creation of the STUN server microservice, creation of the Mailing Server microservice, and the meeting scheduling work flow in general. He further beautified the UI and provided missing routing solutions.
- Tien Thanh-Le provided most of the boiler plate code for "Magnify Frontend" and "Magnify Backend". He worked on user registration work flows and also created the UI for the main video conference page. Further, he worked on dockerizing and deploying the entire product.

# One more thing?

No additional comments to share with the course staff
