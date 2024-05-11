import {
  PutObjectCommand,
  PutObjectCommandInput,
  PutObjectCommandOutput,
  S3Client,
} from '@aws-sdk/client-s3'
import { Injectable } from '@nestjs/common'
import { randomUUID } from 'crypto'

@Injectable()
export class CloudflareService {
  private r2: S3Client
  private awsRegion: string

  constructor() {
    this.awsRegion = 'auto'
    this.r2 = new S3Client({
      region: this.awsRegion,
      credentials: {
        accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID,
        secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY,
      },
      endpoint: process.env.CLOUDFLARE_ENDPOINT,
    })
  }

  async uploadPhoto(file: Express.Multer.File) {
    const fileName = randomUUID().concat('-').concat(file.originalname)

    const input: PutObjectCommandInput = {
      Bucket: 'dogs',
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    }
    try {
      const response: PutObjectCommandOutput = await this.r2.send(
        new PutObjectCommand(input),
      )
      if (response.$metadata.httpStatusCode === 200) {
        console.log('File uploaded successfully')
        return `${process.env.CLOUDFLARE_ENDPOINT}/${fileName}`
      }
      throw new Error('Error uploading file')
    } catch (error) {
      console.error('Error uploading file', error)
      throw new Error('Error uploading file')
    }
  }
}
