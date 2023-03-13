import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VideosController } from './videos/videos.controller';
import { VideosService } from './videos/videos.service';
import { MetadataService } from './metadata/metadata.service';
import { CacheService } from './cache/cache.service';
import { IDataServices } from './data-services/data-services';
import { MockDataServices } from './mock-data-services/mock-data-services';

@Module({
  imports: [],
  controllers: [AppController, VideosController],
  providers: [AppService,
    VideosService,
    MetadataService,
    CacheService,
    {
      provide: IDataServices,
      useClass: MockDataServices,
    },
  ],
  exports: [IDataServices],

})
export class AppModule { }
