import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CloudflareModule } from './cloudflare/cloudflare.module'
import { MulterModule } from '@nestjs/platform-express'
import { ConfigModule } from '@nestjs/config'
import { DogsModule } from './dogs/dogs.module'

@Module({
  imports: [
    CloudflareModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MulterModule.register({
      dest: './uploads',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'dogs',
      password: 'dogs',
      database: 'db-dos-dogs',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    DogsModule,
  ],
  providers: [],
})
export class AppModule {}
