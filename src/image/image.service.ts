import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { writeFileSync } from 'fs';
import { join } from 'node:path';
import { ASSETS_URL } from 'src/shared/constants/static';

@Injectable()
export class ImageService {
    uploadImage(file: Express.Multer.File) {
        const extension = file.originalname.split('.').pop();
        const fileName = randomBytes(12).toString('hex') + '.' + extension;
        const dir = join(process.cwd(), 'assets', fileName);

        writeFileSync(dir, file.buffer);

        return { url: `${ASSETS_URL}/${fileName}` };
    }
}
