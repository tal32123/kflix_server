import { Controller, Post, Get } from '@nestjs/common';
import { VideosService } from './videos.service';

@Controller('videos')
export class VideosController {


    constructor(
        private readonly videosService: VideosService
        ) {
            
        }

    @Get()
    getVideo() {
        return this.videosService.uploadVideo();
    }

    @Get()
    uploadVideo() {
        return this.videosService.uploadVideo();
    }
}
