import { Controller, Post, Get, Header, Param, Res, Headers, UseInterceptors, UploadedFile, Req, Body } from '@nestjs/common';
import { VideosService } from './videos.service';
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
    let metadata = await this.videosService.getVideoMetadata(param.id);
    this.videosService.addView(metadata.id, metadata);
    return metadata;
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
  @Header('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0')
  async asyncGetVideoStream(@Param('id') id: string, @Headers() headers, @Res() res: Response) {
    let video = await this.videosService.getVideoMetadata(id);
    this.videosService.streamVideo(video, headers, res);

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

