import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ProjectService } from './project.service';
import { CreateProjectInput, CreateProjectResult } from './graphql/create-project.model';
import { AuthData } from './pipes/auth-data.pipe';
import { Artifacts } from 'src/auth/auth.service';

@Resolver()
export class ProjectResolver {
    constructor(
        private readonly projectService: ProjectService
    ) { }

    @Mutation(() => CreateProjectResult)
    createProject(
        @Args('input') input: CreateProjectInput,
        @AuthData() tokenData: Artifacts
    ) {
        // console.log(input)
        return this.projectService.createProject({
            text: input.text,
            userId: tokenData.userId,
            images: input.images
        });
    }
}
