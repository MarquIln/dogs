import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common'
import { DogService } from './dog.service'
import { DogDto } from './dog.dto'

@Controller('dogs')
export class DogController {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly dogService: DogService) {}

  @Get()
  async findAll() {
    try {
      return await this.dogService.findAll()
    } catch (error) {
      return 'Sem cachorros ainda'
    }
  }

  @Get(':id')
  async findOne(id: number) {
    try {
      return await this.dogService.findOne(id)
    } catch (error) {
      return 'Cachorro não encontrado'
    }
  }

  @Post()
  async create(@Body() dog: DogDto) {
    try {
      return await this.dogService.create(dog)
    } catch (error) {
      return error
    }
  }

  @Put(':id')
  async update(id: number, @Body() dog: DogDto) {
    try {
      return await this.dogService.update(id, dog)
    } catch (error) {
      return error
    }
  }

  @Delete(':id')
  async delete(id: number) {
    try {
      return await this.dogService.delete(id)
    } catch (error) {
      return error
    }
  }
}
