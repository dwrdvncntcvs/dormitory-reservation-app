import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { DomSanitizer } from '@angular/platform-browser';

const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
};
@Injectable({
  providedIn: 'root',
})
export class ImageService {
  public imagePath;
  imgURL: any;
  image;
  public imgFormat;
  public message: string;

  constructor(private domSanitizer: DomSanitizer) {}

  getImageFile = (files) => {
    console.log(files);
    if (files.length === 0) return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }

    return files;
  };

  getCameraPhoto = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
    });
    console.log(image.base64String);

    const url = `data:image/${image.format};base64,${image.base64String}`;
    this.imgURL = this.domSanitizer.bypassSecurityTrustUrl(url);
    console.log(image);

    const blob = b64toBlob(image.base64String, image.format);
    console.log(blob);
    this.imagePath = blob;

    const imgObj = { imageURL: this.imgURL, imagePath: this.imagePath };

    return imgObj;
  };

  getGalleryPhoto = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos,
    });
    console.log(image.base64String);

    const url = `data:image/${image.format};base64,${image.base64String}`;
    this.imgURL = this.domSanitizer.bypassSecurityTrustUrl(url);
    console.log(image);

    const blob = b64toBlob(image.base64String, image.format);
    console.log(blob);
    this.imagePath = blob;

    const imgObj = { imageURL: this.imgURL, imagePath: this.imagePath };

    return imgObj;
  };
}
