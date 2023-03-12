
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { IDataServices } from 'src/idata-services/idata-services';
import { IGenericRepository } from 'src/igeneric-repository/igeneric-repository';
import { IvideoRepository } from 'src/ivideo-repository/ivideo-repository';
import { Video } from 'src/video/video.interface';

@Injectable()
export class MockDataServices
    implements IDataServices, OnApplicationBootstrap {
    videos: IGenericRepository<Video>;

    onApplicationBootstrap() {
        this.videos = new IvideoRepository<Video>();
    }


}
