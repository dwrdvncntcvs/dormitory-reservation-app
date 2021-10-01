export class ProfileImage {
  id: number;
  filename: string;
  filepath: string;
  mimetype: string;
  size: number;
  userId: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(profileImage) {
    this.id = profileImage.id;
    this.filename = profileImage.filename;
    this.filepath = profileImage.filepath;
    this.mimetype = profileImage.mimetype;
    this.size = profileImage.size;
    this.userId = profileImage.userId;
    this.createdAt = profileImage.createdAt;
    this.updatedAt = profileImage.updatedAt;
  }
}

// createdAt: "2021-09-28T16:01:40.348Z"
// filename: "profileImage-1632844900341.jpg"
// filepath: "image\\profileImage\\profileImage-1632844900341.jpg"
// id: 1
// mimetype: "image/jpeg"
// size: 10203
// updatedAt: "2021-09-28T16:01:40.348Z"
// userId: "2685ecb0-54d4-44ae-933a-bed9a9ea4
