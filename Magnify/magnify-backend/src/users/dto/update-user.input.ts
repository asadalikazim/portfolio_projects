import { CreateUserInput } from './create-user.input';
import { PartialType } from '@nestjs/mapped-types';
import { Field, InputType } from '@nestjs/graphql';
import { IsAlphanumeric, IsEmail, Matches, MaxLength } from 'class-validator';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field({ nullable: false })
  id: string;

  @IsAlphanumeric()
  @MaxLength(30)
  @Field({ nullable: true })
  firstName?: string;

  @IsAlphanumeric()
  @MaxLength(30)
  @Field({ nullable: true })
  lastName?: string;

  @IsEmail()
  @Field({ nullable: true })
  email: string;

  @IsAlphanumeric()
  @MaxLength(30)
  @Field({ nullable: true })
  username: string;

  @Matches(/(?=.{8,})(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z])(?=.*[-.!@#\$%\^&\*])/)
  @Field({ nullable: true })
  password: string;

}