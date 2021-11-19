export class DormitoryProfileImageModel {
  id: number;
  filename: string;
  filepath: string;

  constructor(dormitoryProfileImage) {
    this.id = dormitoryProfileImage.id;
    this.filename = dormitoryProfileImage.filename;
    this.filepath = dormitoryProfileImage.filepath;
  }
}
