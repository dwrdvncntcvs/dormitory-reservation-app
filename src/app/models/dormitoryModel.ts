export class DormitoryModel {
  id: number;
  name: string;
  address: string;
  allowedGender: string;
  contactNumber: string;
  isAccepting: boolean;
  isVerified: boolean;
  userId: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(dormitoryDetailData) {
    this.id = dormitoryDetailData.id;
    this.name = dormitoryDetailData.name;
    this.address = dormitoryDetailData.address;
    this.allowedGender = dormitoryDetailData.allowedGender;
    this.contactNumber = dormitoryDetailData.contactNumber;
    this.isAccepting = dormitoryDetailData.isAccepting;
    this.isVerified = dormitoryDetailData.isVerified;
    this.userId = dormitoryDetailData.userId;
    this.createdAt = dormitoryDetailData.createdAt;
    this.updatedAt
  }
}
