import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VideosController } from './videos/videos.controller';
import { VideosService } from './videos/videos.service';
import { MetadataService } from './metadata/metadata.service';
import { CacheService } from './cache/cache.service';

@Module({
  imports: [],
  controllers: [AppController, VideosController],
  providers: [AppService, VideosService, MetadataService, CacheService],
})
export class AppModule {}
