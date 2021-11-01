export class DormitoryProfileImageModel {
  id: number;
  filename: string;

  constructor(dormitoryProfileImage) {
    this.id = dormitoryProfileImage.id;
    this.filename = dormitoryProfileImage.filename;
  }
}
