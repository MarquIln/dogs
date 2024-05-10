import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DogEntity } from './dog.entity'
import { Repository } from 'typeorm'
import { DogDto } from './dog.dto'

@Injectable()
export class DogService {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @InjectRepository(DogEntity)
    private dogRepository: Repository<DogEntity>,
  ) {}

  async findAll(): Promise<DogEntity[]> {
    return this.dogRepository.find()
  }

  async findOne(id: number): Promise<DogEntity> {
    return this.dogRepository.findOne({
      where: {
        id,
      },
    })
  }

  async create(dog: DogDto): Promise<DogEntity> {
    return this.dogRepository.save(dog)
  }

  async update(id: number, dog: DogDto): Promise<DogEntity> {
    await this.dogRepository.update(id, dog)
    return this.dogRepository.findOne({
      where: {
        id,
      },
    })
  }

  async delete(id: number): Promise<void> {
    await this.dogRepository.delete(id)
  }
}
