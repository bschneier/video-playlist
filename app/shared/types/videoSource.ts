export class VideoSource {
  type: string = null;
  src: string = null;

  constructor(mimeType: string, fileName: string) {
    this.type = mimeType;
    this.src = fileName;
  }
}