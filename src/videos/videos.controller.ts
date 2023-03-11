import { Controller, Post, Get, Header, Param, Res, Headers, HttpStatus, UseInterceptors, UploadedFile, Req, Body } from '@nestjs/common';
import { VideosService } from './videos.service';
import { statSync, createReadStream } from 'fs';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { Video } from 'src/video/video.interface';
import { diskStorage } from 'multer';
const { randomUUID } = require('crypto'); // Added in: node v14.17.0

@Controller('videos')
export class VideosController {


  constructor(
    private readonly videosService: VideosService
  ) {

  }

  @Get('video/:id')
  async getVideo(@Param() param) {
    return await this.videosService.getVideoMetadata(param.id);
  }
  @Get('getTopVideos')
  async getTopVideos() {
    try {
      const topVideos = await this.videosService.getTopVideos();
      return topVideos;
    } catch (error) {

    }
  }
  @Get('stream/:id')
  @Header('Accept-Ranges', 'bytes')
  @Header('Content-Type', 'video/mp4')
  @Header('Cache-Control', 'no-store')
  async asyncGetVideoStream(@Param('id') id: string, @Headers() headers, @Res() res: Response) {
    let video = await this.videosService.getVideoMetadata(id);
    const videoPath = video.locationURL;

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

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './assets/videos',
      filename: (req, file, cb) => {
        return cb(null, `${randomUUID()}${file.originalname}`)
      }
    })
  }))
  async uploadVideo(@UploadedFile() file: Express.Multer.File[], @Body() video: Video) {

    if (file) {
      return await this.videosService.uploadVideo(file, video);
    }
  }
}

