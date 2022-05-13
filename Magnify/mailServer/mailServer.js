const express = require('express')
const app = express()
const server = require('http').Server(app)
const nodemailer = require('nodemailer');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const ical = require('ical-generator');
const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];  
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.MAIL_ACCESS_TOKEN, (err, data) => {
        if (err) {
            console.log(err);
            return res.sendStatus(403);
        }
        if (data !== process.env.MAIL_CALLER_TOKEN) {
            console.log(data);
            return res.sendStatus(403);
        }
        next();
    })
}

const transporter = nodemailer.createTransport({
  service: process.env.MAIL_SERV,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

const schema = buildSchema(`
  type Query {
    mailInvites(
        organiserName: String!, 
        organiserEmail: String!, 
        startDateTime: String!,
        endDateTime: String!,
        summary: String!,
        description: String,
        meetingLink: String!,
        attendeesEmails: [String!]!): String!
  }
`);

const root = {
    mailInvites: (
        {
            organiserName, 
            organiserEmail, 
            startDateTime, 
            endDateTime, 
            summary, 
            description, 
            meetingLink, 
            attendeesEmails
        }) => {

            // Calendar
            let cal = ical();
            cal.createEvent({
                start: startDateTime,
                end: endDateTime,
                summary: summary,
                description: description,
                location: meetingLink,
                organizer: {
                    name: organiserName,
                    email: organiserEmail
                },
            });
            let invite = new Buffer.from(cal.toString());

            // Email the organiser a receipt
            let organiserMailOptions = {
                from: `Magnify <${process.env.MAIL_USER}>`,
                to: organiserEmail,
                subject: 'Your Magnify Meeting',
                text: `Dear ${organiserName},\nPlease find attached the invite for your scheduled meeting.`,
                icalEvent: {
                    content: invite
                }
            };
            transporter.sendMail(organiserMailOptions, (err, data) => {
                if (err) console.error(err);
                if (data) console.log(data);
            });

            // Email the attendees an invite
            attendeesEmails.forEach(attendeeEmail => {
                const attendeeMailOptions =  {
                    from: `Magnify <${process.env.MAIL_USER}>`,
                    to: attendeeEmail,
                    subject: `Magnify Invite from ${organiserName}`,
                    text: `You have been invited to a meeting on Magnify by ${organiserName}!\nPlease find the attached invite for more details.`,
                    icalEvent: {
                        content: invite
                    }
                };
                transporter.sendMail(attendeeMailOptions, (err, data) => {
                    if (err) console.error(err);
                    if (data) console.log(data);
                });
            });

        return 'OK';
    }  
};

app.use('/graphql',
    authenticateToken,
    graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: process.env.DEV_MODE,
  }));
server.listen(process.env.MAIL_SERVER_PORT)
