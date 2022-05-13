import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Exclude, Transform } from 'class-transformer';
import { IsAlphanumeric, IsEmail, Matches, MaxLength } from 'class-validator';
import xss from 'xss';
import { sanitize } from 'mongo-sanitize';
import validator from 'validator';

@ObjectType()
export class User {

  // @Exclude()
  @Field(type => ID)
  id: string;

  // @MaxLength(30)
  @Field({ nullable: true })
  firstName?: string;

  // @MaxLength(30)
  @Field({ nullable: true })
  lastName?: string;

  @IsEmail()
  @Transform(email => sanitize(email)) // todo how to sanitize globally.
  @Transform(email => {
    let e = validator.normalizeEmail(email as unknown as string);
    console.log(e);
    return e;
  })
  @Field(type => String)
  email: string;

  @IsAlphanumeric()
  @MaxLength(30)
  @Field()
  username: string;

  @Matches(/(?=.{8,})(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z])(?=.*[-.!@#\$%\^&\*])/)
  @Exclude()
  @Field()
  password: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}