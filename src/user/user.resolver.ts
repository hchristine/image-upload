import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserInput, CreateUserResultUnion } from './graphql/create-user.model';

@Resolver()
export class UserResolver {
    constructor(
        private readonly userService: UserService
    ) { }

    @Query(() => String)
    hello() {
        console.log('Hello world')
    }

    @Mutation(() => CreateUserResultUnion)
    createUser(
        @Args('input') input: CreateUserInput
    ) {
        return this.userService.createUser(input);
    }
}
