import { IGenericRepository } from "src/generic-repository/generic-repository";
import { Video } from "src/video/video.interface";

export class IvideoRepository<T> implements IGenericRepository<T>{
  private videosArr: Video[] = [];
  constructor() {
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth() + 1 // JS months are 0 indexed, 0 = January, 11 = December
    let day = date.getDate()
    let dateString = year + '-' + month + '-' + day;
    for (let i = 0; i < 2; i++) {
      let dummyVideo: Video = {
        id: `${i}`,
        title: `My Video ${i}`,
        uploadedUsername: "anonymous",
        views: Math.floor(Math.random() * 1000000),
        uploadDate: dateString,
        locationURL: `1.mp4`,
      }

      this.videosArr.push(dummyVideo);
    }
  }
  getAll(): Promise<Video[]> {
    const myPromise: Promise<Video[]> = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.videosArr);
      }, 300);
    });
    return myPromise;
  }
  get(id: string): Promise<Video> {
    const myPromise: Promise<Video> = new Promise((resolve, reject) => {
      setTimeout(() => {
        let video = this.videosArr.find(video => video.id === id);
        resolve(video);
      }, 300);
    });
    return myPromise;
  }
  create(video: Video): Promise<Video> {
    const myPromise: Promise<Video> = new Promise((resolve, reject) => {
      setTimeout(() => {
        this.videosArr.push(video);
        resolve(video);
      }, 300);
    });
    return myPromise;
  }
  update(id: string, item: Video) {

    this.videosArr = this.videosArr.map(video => {
      return video.id === id ? item : video
    });

    const myPromise: Promise<Video> = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(item);
      }, 300);
    });
    return myPromise;

  }

}
