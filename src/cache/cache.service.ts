import { Injectable } from '@nestjs/common';
import { Video } from 'src/video/video.interface';

@Injectable()
export class CacheService {
    /*
    * Simple implementation of a cache for our purposes, nest has a more robust system as does 
    */
    private cache = {};
    getCache(id: string) {
        return this.cache[id];
    }

    addOrUpdateCache(id, data) {
        this.cache[id] = data;
    }

}
