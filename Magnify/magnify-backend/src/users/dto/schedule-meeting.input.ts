import { Field, InputType } from '@nestjs/graphql';
import { IsAlphanumeric, IsDate, IsDateString, MaxLength } from 'class-validator';

@InputType()
export class ScheduleMeetingInput {
    @MaxLength(30)
    @Field()
    summary: string;

    @MaxLength(150)
    @Field({ nullable: true })
    description?: string;

    @IsAlphanumeric()
    @MaxLength(30)
    @Field()
    username1: string;

    @MaxLength(30)
    @Field({ nullable: true })
    username2?: string;

    @MaxLength(30)
    @Field({ nullable: true })
    username3?: string;
    
    @MaxLength(30)
    @Field({ nullable: true })
    username4?: string;

    @IsDateString()
    @Field()
    startDateTime: string;

    @IsDateString()
    @Field()
    endDateTime: string;
}