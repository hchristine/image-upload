import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import * as qrcode from 'qrcode';
import { join } from 'node:path';
import { writeFile } from 'node:fs';
import { ASSETS_URL } from 'src/shared/constants/static';

@Injectable()
export class ProjectService {
    constructor(
        @InjectRepository(Project)
        private projectRepo: Repository<Project>
    ) { }

    async createProject(input: Pick<Project, 'text' | 'userId' | 'images'>) {
        const project = await this.projectRepo.save(input);
        const qrUrl = `http://localhost:3000/project-view/${project.id}`;

        const qrDataUrl = await qrcode.toDataURL(qrUrl);
        const rawEncoding = qrDataUrl.split('base64,')[1];

        const fileName = `qr-${project.id}.png`;
        const saveAt = join(
            process.cwd(),
            'assets',
            fileName
        );

        await this.saveQrImage(saveAt, rawEncoding);

        project.qrUrl = `${ASSETS_URL}/${fileName}`;

        await this.projectRepo.update({
            id: project.id
        }, {
            qrUrl: project.qrUrl
        });

        return project;
    }

    private async saveQrImage(fileName: string, data: string): Promise<string> {
        return new Promise((resolve, reject) => {
            writeFile(fileName, data, { encoding: 'base64' }, (err) => {
                if (err) {
                    reject();
                    return;
                }
                resolve(fileName);
            });
        });
    }
}
