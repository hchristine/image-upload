import { ArgumentsHost, BadRequestException, Catch } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { Response } from "express";

@Catch(BadRequestException)
export class ValidationExceptionFilter extends BaseExceptionFilter {
    catch(exception: any, host: ArgumentsHost): void {
        const response = exception.getResponse();
        const ctx = host.switchToHttp();

        if (!host.switchToHttp().getRequest()?.url.includes('graphql')) {
            (ctx.getResponse() as Response)
                .status(400)
                .json(response);

            return;
        }

        if (Array.isArray(response.message)) {
            // @ts-ignore
            return {
                fields: response.message
            }
        }

        return super.catch(exception, host);
    }
}