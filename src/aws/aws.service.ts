import { Injectable } from '@nestjs/common';
import {PutObjectCommand, S3Client} from "@aws-sdk/client-s3"

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Falta la variable de entorno: ${name}`);
  return value;
}
@Injectable()
export class AwsService {
    private s3 = new S3Client({
        region: 'us-east-2',
        credentials: {
            accessKeyId: requireEnv('ACCESSKEY_BUCKET'),
            secretAccessKey: requireEnv('SECRETKEY_BUCKET')
        }
    })

    async uploadFile(file: Express.Multer.File) {
        const key = file.originalname;
        const url = `https://backend-autos.s3.us-east-2.amazonaws.com/${key}`;
        const bucket = requireEnv('BUCKET_NAME');
        const command = new PutObjectCommand({
            Key: key,
            Body: file.buffer,
            Bucket: bucket,
            ContentType: file.mimetype || 'application/octet-stream',
            ContentDisposition: 'inline'
        })
        await this.s3.send(command);
        return url;
    }
}