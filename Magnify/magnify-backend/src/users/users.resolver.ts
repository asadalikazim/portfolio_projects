import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { LoginUserInput } from './dto/login-user.input';
import { UserDocument, UserSchema } from './schemas/user.schema';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './guards/auth.guard';
import { ScheduleMeetingInput } from './dto/schedule-meeting.input';
import { v4 as uuidv4 } from 'uuid';
import fetch from 'node-fetch';

const dotenv = require('dotenv');
dotenv.config();

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) { }

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput, @Context() context) {
    return this.usersService.create(createUserInput, context.req.session);
  }

  @Query(() => Boolean)
  test(@Context() context) {
    context.req.session.test = "test to initialize"
    console.log(context);
    return true;
  }

  @Query(() => User, { nullable: true })
  login(@Args('LoginUserInput') { email, password }: LoginUserInput, @Context() context) {
    return this.usersService.login({ email, password }, context.req.session);
  }

  @Query(() => Boolean, { nullable: true })
  logout(@Context() context) {
    return this.usersService.logout(context.req.session);
  }

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('email', { type: () => String }) email: String) {
    return this.usersService.findOne(email);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.remove(id);
  }

  @UseGuards(AuthGuard)
  @Query(() => Boolean)
  async schedule(@Args('ScheduleMeetingInput') {summary,description,username1,username2,username3,username4,startDateTime,endDateTime}: ScheduleMeetingInput, @Context() context) {
    let emailOrganiser = await this.usersService.findEmailByUsername(context.req.session.username);
    if (!emailOrganiser) return false;
    
    let attendees = [];

    // at least one attendee
    let email1 = await this.usersService.findEmailByUsername(username1);
    if (!email1) return false;
    attendees.push(email1);

    let email2 = null;
    if (username2) {
      email2 = await this.usersService.findEmailByUsername(username2);
      if (!email2) return false;
      attendees.push(email2);
    }

    let email3 = null;
    if (username3) {
      email3 = await this.usersService.findEmailByUsername(username3);
      if (!email3) return false;
      attendees.push(email3);
    }

    let email4 = null;
    if (username4) {
      email4 = await this.usersService.findEmailByUsername(username4);
      if (!email4) return false;
      attendees.push(email4);
    }

    // generate room link
    let meetingLink = process.env.MEETING_LINK + uuidv4();

    const query = `query MailInvites(
        $organiserName: String!,
        $organiserEmail: String!,
        $startDateTime: String!,
        $endDateTime: String!,
        $summary: String!,
        $description: String,
        $meetingLink: String!,
        $attendeesEmails: [String!]!
    ) {
        mailInvites(
            organiserName: $organiserName,
            organiserEmail: $organiserEmail,
            startDateTime: $startDateTime,
            endDateTime: $endDateTime,
            summary: $summary,
            description: $description,
            meetingLink: $meetingLink,
            attendeesEmails: $attendeesEmails
        )
    }`;

    const variables = {
      "organiserEmail": emailOrganiser,
      "organiserName": context.req.session.username,
      "startDateTime": startDateTime,
      "endDateTime": endDateTime,
      "summary": summary,
      "description": description,
      "meetingLink": meetingLink,
      "attendeesEmails": attendees
    }

    // send to mail server
    fetch('http://localhost:6000/graphql', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + process.env.MAIL_SERVER_TOKEN,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: variables,
      })
    })
      .then(r => r.json())
      .then(data => console.log('data returned:', data));

    return true
  }
}
