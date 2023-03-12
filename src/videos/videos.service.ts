import { Injectable, HttpStatus } from '@nestjs/common';
import { MetadataService } from 'src/metadata/metadata.service';
import { Video } from 'src/video/video.interface';
const { randomUUID } = require('crypto'); // Added in: node v14.17.0
import { statSync, createReadStream } from 'fs';

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

    streamVideo(video, headers, res){
      
    const videoPath = `assets/videos/${video.locationURL}`;

    const { size } = statSync(videoPath);
    const videoRange = headers.range;
    if (videoRange) {
      const parts = videoRange.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : size - 1;
      const chunksize = (end - start) + 1;
      const readStreamfile = createReadStream(videoPath, { start, end, highWaterMark: 60 });
      const head = {
        'Content-Range': `bytes ${start}-${end}/${size}`,
        'Content-Length': chunksize,
      };
      res.writeHead(HttpStatus.PARTIAL_CONTENT, head); //206
      readStreamfile.pipe(res);
    } else {
      const head = {
        'Content-Length': size,
      };
      res.writeHead(HttpStatus.OK, head);//200
      createReadStream(videoPath).pipe(res);
    }
    }
}
