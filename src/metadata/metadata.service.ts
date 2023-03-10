import { Injectable } from '@nestjs/common';
import { CacheService } from 'src/cache/cache.service';
import { IDataServices } from 'src/idata-services/idata-services';
import { Video } from 'src/video/video.interface';

@Injectable()
export class MetadataService {
    constructor(private readonly cacheService: CacheService,
        private dataServices: IDataServices,
        ){

        }

    async createMetadata(data): Promise<string> {
        await this.dataServices.videos.create(data);
        return 'created';
      }

      async updateMetadata(id: string, data: any){
        await this.dataServices.videos.update(id, data);
        this.cacheService.addOrUpdateCache(id, data);
      }

      async getVideoMetadatabyId(id: string){
        let metadata = this.cacheService.getCache(id);
        if(!metadata){
            metadata = await this.dataServices.videos.get(id);
            if(metadata){
                this.cacheService.addOrUpdateCache(metadata.id, metadata);
            }
        }
        return metadata;
      }

      
      async getTopVideosMetadata(){

        let date = new Date()
        let  year= date.getFullYear()
        let month = date.getMonth()+1 // JS months are 0 indexed, 0 = January, 11 = December
        let day = date.getDate()
        let dateString = year + '-' + month + '-'+ day;

        let metadata = this.cacheService.getCache(dateString);
        if(!metadata){
            metadata = await this.dataServices.videos.getAll();
            metadata = metadata.sort((a, b)=>(b.views - a.views));
            if(metadata){
            this.cacheService.addOrUpdateCache(dateString, metadata);   
        }
        }
        return metadata;
      }

}

