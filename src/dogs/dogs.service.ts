import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DogsEntity } from './dogs.entity'
import { Repository } from 'typeorm'
import { DogsDto } from './dogs.dto'
import { CloudflareService } from 'src/cloudflare/cloudflare.service'

@Injectable()
export class DogsService {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @InjectRepository(DogsEntity)
    private dogRepository: Repository<DogsEntity>,
    private r2: CloudflareService,
  ) {}

  async createDog(payload: DogsDto, dogPhoto: Express.Multer.File) {
    if (dogPhoto) {
      payload.photo = await this.r2.uploadPhoto(dogPhoto)
    }
    return this.dogRepository.save(payload)
  }
}
