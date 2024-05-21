import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ValidationError {
    @Field(() => [String])
    fields: []
}