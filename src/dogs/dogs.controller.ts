import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { DogsService } from './dogs.service'
import { FileInterceptor } from '@nestjs/platform-express'
import { DogsDto } from './dogs.dto'

@Controller('dogs')
export class DogsController {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly dogsService: DogsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('photo'))
  createDog(
    @Body() payload: DogsDto,
    @UploadedFile() dogPhoto: Express.Multer.File,
  ): Promise<DogsDto> {
    return this.dogsService.createDog(payload, dogPhoto)
  }
}
