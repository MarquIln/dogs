import { Module } from '@nestjs/common'
import { DogController } from './dog.controller'
import { DogService } from './dog.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DogEntity } from './dog.entity'

@Module({
  imports: [TypeOrmModule.forFeature([DogEntity])],
  controllers: [DogController],
  providers: [DogService],
})
export class DogModule {}
