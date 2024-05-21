import { Context } from "@nestjs/graphql";
import { AuthPipe } from "src/shared/pipes/auth.pipe";

export const AuthData = () => Context('req', AuthPipe);