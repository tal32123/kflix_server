import { IGenericRepository } from 'src/generic-repository/generic-repository';
import { Video } from 'src/video/video.interface';

export abstract class IDataServices {
  abstract videos: IGenericRepository<Video>;
}