import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType({
    description: 'This object represents user data'
})
export class User {
    @Field()
    id: string;

    @Field()
    fullname: string;

    @Field()
    email: string;

    @Field()
    password: string;
}