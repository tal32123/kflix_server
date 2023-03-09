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
      getVideo(id: string): string {
        let videoMD : Video= this.metadataService.getVideoMetadatabyId(id);
        videoMD.views++;
        this.metadataService.updateMetadata(id, videoMD);
        //todo: get video from store

        return 'uploaded';
      }

      getTopVideos(){
        let videosMd: Video[] = this.metadataService.getTopVideosMetadata()
      }

}
