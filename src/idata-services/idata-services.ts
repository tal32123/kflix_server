import { IGenericRepository } from 'src/igeneric-repository/igeneric-repository';
import { Video } from 'src/video/video.interface';

export abstract class IDataServices {
  abstract videos: IGenericRepository<Video>;
}