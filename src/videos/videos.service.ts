import { Injectable } from '@nestjs/common';
import { MetadataService } from 'src/metadata/metadata.service';
import { Video } from 'src/video/video.interface';

@Injectable()
export class VideosService {
    constructor(private readonly metadataService: MetadataService){}

    uploadVideo(): string {
        this.metadataService.createMetadata();
        return 'uploaded';
      }
      getVideoMetadata(id: string): Video {
        let videoMD : Video= this.metadataService.getVideoMetadatabyId(id);
        videoMD.views++;
        this.metadataService.updateMetadata(id, videoMD);
        return videoMD;
      }

      

      getTopVideos(){
        let videosMd: Video[] = this.metadataService.getTopVideosMetadata()
      }

}
