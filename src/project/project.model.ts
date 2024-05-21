import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Project {
    @Field()
    id: string;

    @Field()
    text: string;

    @Field()
    userId: string;

    @Field()
    qrUrl: string;

    @Field(() => [String])
    images: string[];
}