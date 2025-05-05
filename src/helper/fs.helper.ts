import { Injectable } from '@nestjs/common';
import * as path from 'node:path';
import * as fs from 'node:fs';

@Injectable()
export class FsHelper {
  async uploadFile(file: Express.Multer.File) {
    const fileFolder = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(fileFolder)) {
      fs.mkdirSync(fileFolder, { recursive: true });
    }

    let fileName = `${Date.now()}-file.${file.originalname.split('.')[1]}`;

    await fs.promises.writeFile(path.join(fileFolder, fileName), file.buffer);

    return{
        message:'success',
        fileUrl: path.join(fileFolder, fileName)
    }
  }
}
