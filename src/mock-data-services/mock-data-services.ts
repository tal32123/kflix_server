
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { IDataServices } from 'src/data-services/data-services';
import { IGenericRepository } from 'src/generic-repository/generic-repository';
import { IvideoRepository } from 'src/video-repository/video-repository';
import { Video } from 'src/video/video.interface';

@Injectable()
export class MockDataServices
    implements IDataServices, OnApplicationBootstrap {
    videos: IGenericRepository<Video>;

    onApplicationBootstrap() {
        this.videos = new IvideoRepository<Video>();
    }


}
