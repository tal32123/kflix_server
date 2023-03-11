import { Injectable } from '@nestjs/common';
import { MetadataService } from 'src/metadata/metadata.service';
import { Video } from 'src/video/video.interface';

@Injectable()
export class VideosService {

    constructor(private readonly metadataService: MetadataService){
        
    }

    async uploadVideo(video: Video): Promise<string> {
        await this.metadataService.createMetadata(video);
        return 'uploaded';
      }

      /*
      * Get a specific video's metadata, assuming this is only used for watching videos, so also increasing views
      */
      async getVideoMetadata(id: string): Promise<Video> {
        let videoMD : Video= await this.metadataService.getVideoMetadatabyId(id);
        videoMD.views++;
        await this.metadataService.updateMetadata(id, videoMD);
        return videoMD;
      }

      
      //Gets the videos with the most views
      async getTopVideos(){
        let videosMd: Video[] = await this.metadataService.getTopVideosMetadata();
        return videosMd;
      }

}
