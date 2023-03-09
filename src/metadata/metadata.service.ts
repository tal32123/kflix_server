import { Injectable } from '@nestjs/common';
import { CacheService } from 'src/cache/cache.service';
import { Video } from 'src/video/video.interface';

@Injectable()
export class MetadataService {
    constructor(private readonly cacheService: CacheService){}

    createMetadata(): string {
        console.log("y");
        return 'created';
      }

      updateMetadata(id: string, data: any){
        //todo: update metadata on mongodb
        this.cacheService.addOrUpdateCache(id, data);
      }

      getVideoMetadatabyId(id: string){
        let metadata = this.cacheService.getCache(id);
        if(!metadata){
            //todo: get metadata

            this.cacheService.addOrUpdateCache(metadata.id, metadata);
        }
        return metadata;
      }

      
      getTopVideosMetadata(){

        let date = new Date()
        let  year= date.getFullYear()
        let month = date.getMonth()+1 // JS months are 0 indexed, 0 = January, 11 = December
        let day = date.getDate()
        let dateString = year + '-' + month + '-'+ day;
        
        let metadata = this.cacheService.getCache(dateString);
        if(!metadata){
            //todo: get metadata for top videos

            this.cacheService.addOrUpdateCache(dateString, metadata);
        }
        return metadata;
      }

}

