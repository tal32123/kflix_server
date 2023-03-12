import { Injectable } from '@nestjs/common';
import { MetadataService } from 'src/metadata/metadata.service';
import { Video } from 'src/video/video.interface';
const { randomUUID } = require('crypto'); // Added in: node v14.17.0

@Injectable()
export class VideosService {

  constructor(private readonly metadataService: MetadataService) {

  }

  async uploadVideo(fileDetails: any, video: Video): Promise<Video> {

    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth() + 1 // JS months are 0 indexed, 0 = January, 11 = December
    let day = date.getDate()
    let dateString = year + '-' + month + '-' + day;
    video.locationURL = fileDetails.filename;
    video.id = fileDetails.filename;

    video.uploadedUsername = "User #1";
    video.uploadDate = dateString;
    video.views = 0;
    await this.metadataService.createMetadata(video);
    return video;
  }

  /*
  * Get a specific video's metadata
  */
  async getVideoMetadata(id: string): Promise<Video> {
    let videoMD: Video = await this.metadataService.getVideoMetadatabyId(id);
    return videoMD;
  }
  async addView(id, data){
    data.views++;
    await this.metadataService.updateMetadata(id, data);
  }

  //Gets the videos with the most views
  async getTopVideos() {
    let videosMd: Video[] = await this.metadataService.getTopVideosMetadata();
    return videosMd;
  }

}
