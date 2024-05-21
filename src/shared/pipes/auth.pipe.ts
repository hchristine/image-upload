import { ArgumentMetadata, Injectable, PipeTransform, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { AuthService } from "src/auth/auth.service";

@Injectable()
export class AuthPipe implements PipeTransform {
    constructor(
        private readonly authService: AuthService
    ) { }

    async transform(req: Request, metadata: ArgumentMetadata) {
        const token = req.headers.authorization;

        if (!token) {
            throw new UnauthorizedException();
        }

        return this.authService.verify(token);
    }
}