import { Image } from "./image";

export class Album {

  constructor(private name: string = null, private description: string = null, private images: Image[] =[]) {
    this.name = name;
    this.description = description;
    this.images = images;
  }
}
