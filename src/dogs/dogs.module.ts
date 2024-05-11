import { Module } from '@nestjs/common'
import { DogsController } from './dogs.controller'
import { DogsService } from './dogs.service'
import { CloudflareModule } from 'src/cloudflare/cloudflare.module'
import { DogsEntity } from './dogs.entity'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [CloudflareModule, TypeOrmModule.forFeature([DogsEntity])],
  controllers: [DogsController],
  providers: [DogsService],
})
export class DogsModule {}
