import { Field, InputType, createUnionType } from "@nestjs/graphql";
import { ArrayMaxSize, ArrayMinSize, MaxLength } from "class-validator";
import { IsArrayOfUrls } from "src/shared/validators/array-of-urls.validator";
import { Project } from "../project.model";
import { ValidationError } from "src/shared/models/validation-error.model";

@InputType({
    description: 'Payload that requires createProject mutation'
})
export class CreateProjectInput {
    @Field()
    @MaxLength(200)
    text: string;

    @Field(() => [String])
    @ArrayMinSize(1)
    @ArrayMaxSize(100)
    @IsArrayOfUrls({
        message: 'Images should contain URLs'
    })
    images: string[];
}

export const CreateProjectResult = createUnionType({
    name: 'CreateProjectResult',
    types: () => [
        Project,
        ValidationError
    ],
    resolveType: (data) => {
        if (data?.fields) {
            return ValidationError
        }
        return Project;
    }
})