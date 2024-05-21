import { Controller, FileTypeValidator, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ImageService } from './image.service';
import { FileInterceptor } from '@nestjs/platform-express';

const ALLOWED_MIMETYPE = /image\/(jpg|png|jpeg)/ig;

@Controller('image')
export class ImageController {
    constructor(
        private readonly imageService: ImageService
    ) { }

    @Post('upload')
    @UseInterceptors(FileInterceptor('image'))
    async upload(
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new FileTypeValidator({ fileType: ALLOWED_MIMETYPE }),
                ]
            })
        ) file: Express.Multer.File) {
        return this.imageService.uploadImage(file);
    }
}
