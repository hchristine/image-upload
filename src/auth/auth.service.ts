import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { SignInInput } from './graphql/sign-in.model';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService
    ) { }

    async sign(artifacts: SignInInput): Promise<string> {
        const user = await this.userService.findOne({
            where: artifacts
        });

        if (!user) {
            throw new UnauthorizedException()
        }

        return this.jwtService.signAsync({
            userId: user.id
        })
    }

    async verify(token: string): Promise<Artifacts> {
        return this.jwtService.verifyAsync(token);
    }
}

export type Artifacts = {
    userId: string;
}
