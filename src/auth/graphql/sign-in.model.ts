import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { MaxLength, MinLength } from "class-validator";

@InputType({
    description: 'Payload for user sign in'
})
export class SignInInput {
    @Field(() => String)
    email: string;

    @Field(() => String)
    @MinLength(4)
    @MaxLength(20)
    password: string;
}

@ObjectType()
export class SignInSuccess {
    @Field()
    token: string;
}
