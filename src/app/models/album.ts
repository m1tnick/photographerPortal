import { Image } from "./image";

export class Album {

  constructor(
      private name: string, 
      private description: string, 
      private images: Image[] =[],
      private id: string = null
    ) {
    this.name = name;
    this.description = description;
    this.images = images;
    this.id = id;
  }
}
