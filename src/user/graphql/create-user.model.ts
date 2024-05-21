import { Field, InputType, createUnionType } from "@nestjs/graphql";
import { IsEmail, MinLength } from "class-validator";
import { User } from "../user.model";

@InputType({
    description: 'Payload that requires createUser mutation'
})
export class CreateUserInput {
    @Field(() => String)
    fullname: string;

    @Field()
    @IsEmail()
    email: string;

    @Field(() => String)
    @MinLength(4)
    password: string;
}

export const CreateUserResultUnion = createUnionType({
    name: 'CreateUserResultUnion',
    types: () => [
        User
    ],
    resolveType: (data) => {
        return User;
    }
})