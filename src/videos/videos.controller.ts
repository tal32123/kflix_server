import { Controller, Post, Get, Header, Param, Res, Headers, HttpStatus } from '@nestjs/common';
import { VideosService } from './videos.service';
import { statSync, createReadStream } from 'fs';
import { Response } from 'express';

@Controller('videos')
export class VideosController {


    constructor(
        private readonly videosService: VideosService
        ) {

        }

    @Get('video/:id')
    async getVideo(@Param() param) {
        console.log('wrong place');
        return await this.videosService.getVideoMetadata(param.id);
    }
    @Get('getTopVideos')
    async getTopVideos() {
        try {
            return await this.videosService.getTopVideos();
        } catch (error) {
            console.log(error);
        }
    }
    @Get('stream/:id')
    @Header('Accept-Ranges', 'bytes')
    @Header('Content-Type', 'video/mp4')
    asyncGetVideoStream(@Param('id') id: string, @Headers() headers, @Res() res: Response){
        const videoPath = `assets/videos/${id}.mp4`;
        const { size } = statSync(videoPath);
        const videoRange = headers.range;
        if (videoRange) {
          const parts = videoRange.replace(/bytes=/, "").split("-");
          const start = parseInt(parts[0], 10);
          const end = parts[1] ? parseInt(parts[1], 10) : size - 1;
          const chunksize = (end - start) + 1;
          const readStreamfile = createReadStream(videoPath, { start, end, highWaterMark:60 });
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

    @Get()
    async uploadVideo(video) {
        return await this.videosService.uploadVideo(video);
    }
}
