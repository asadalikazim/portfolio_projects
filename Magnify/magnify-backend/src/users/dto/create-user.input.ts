import { Field, InputType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsAlphanumeric, IsEmail, IsNotEmpty, Matches, MaxLength } from 'class-validator';
import validator from 'validator';
@InputType()
export class CreateUserInput {
  @IsAlphanumeric()
  @MaxLength(30)
  @Field({ nullable: true })
  firstName?: string;

  @IsAlphanumeric()
  @MaxLength(30)
  @Field({ nullable: true })
  lastName?: string;

  @IsEmail()
  @Transform(({ value }) => validator.normalizeEmail(value))
  @Field()
  email: string;

  @IsAlphanumeric()
  @MaxLength(30)
  @Field()
  username: string;

  @Matches(/(?=.{8,})(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z])(?=.*[-.!@#\$%\^&\*])/)
  @Field()
  password: string;
}