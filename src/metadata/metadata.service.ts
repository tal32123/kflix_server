import { Injectable } from '@nestjs/common';
import { CacheService } from 'src/cache/cache.service';
import { IDataServices } from 'src/idata-services/idata-services';
import { Video } from 'src/video/video.interface';

@Injectable()
export class MetadataService {
  constructor(private readonly cacheService: CacheService,
    private dataServices: IDataServices,
  ) {

  }

  async createMetadata(data: Video): Promise<Video> {
    await this.dataServices.videos.create(data);

    const date = this.getDate();
    const topVideos: Video[] = await this.cacheService.getCache(date);
    if (topVideos && !topVideos?.some(video => video.id == data.id)) {
      topVideos.push(data);
      this.cacheService.addOrUpdateCache(date, topVideos);
    }
    this.cacheService.addOrUpdateCache(data.id, data);

    return data;
  }

  async updateMetadata(id: string, data: any) {
    await this.dataServices.videos.update(id, data);
    const date = this.getDate();
    const topVideos: Video[] = await this.cacheService.getCache(date);
    this.cacheService.addOrUpdateCache(data.id, data)
    if (topVideos) {
      topVideos.map(video => {
        if (video.id == id) {
          video = data;
        }
        return video;
      });
      this.cacheService.addOrUpdateCache(date, topVideos);
    }
  }

  async getVideoMetadatabyId(id: string) {
    let metadata = this.cacheService.getCache(id);
    if (!metadata) {
      metadata = await this.dataServices.videos.get(id);
      if (metadata) {
        this.cacheService.addOrUpdateCache(metadata.id, metadata);
      }
    }
    return metadata;
  }


  async getTopVideosMetadata() {

    let dateString = this.getDate();

    let metadata = this.cacheService.getCache(dateString);
    if (!metadata) {
      metadata = await this.dataServices.videos.getAll();
      metadata = metadata.sort((a, b) => (b.views - a.views));
      if (metadata) {
        this.cacheService.addOrUpdateCache(dateString, metadata);
      }
    }
    return metadata;
  }
  getDate = () => {
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth() + 1 // JS months are 0 indexed, 0 = January, 11 = December
    let day = date.getDate()
    let dateString = year + '-' + month + '-' + day;
    return dateString;
  };
}

