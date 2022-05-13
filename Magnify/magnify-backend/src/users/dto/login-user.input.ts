import { CreateUserInput } from './create-user.input';
import { PartialType } from '@nestjs/mapped-types';
import { Field, InputType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType()
export class LoginUserInput extends PartialType(CreateUserInput) {
    @IsEmail()
    @Field()
    email: string;

    @Field()
    password: string;
}