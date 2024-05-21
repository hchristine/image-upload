import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignInInput, SignInSuccess } from './graphql/sign-in.model';

@Resolver()
export class AuthResolver {
    constructor(
        private readonly authService: AuthService
    ) { }

    @Mutation(() => SignInSuccess)
    async signIn(
        @Args('input') input: SignInInput
    ) {
        const token = this.authService.sign(input);

        return { token };
    }
}
