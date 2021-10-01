export class UserModel {
  id: number;
  name: string;
  username: string;
  email: string;
  contactNumber: string;
  gender: string;
  role: string;
  address: string;
  isEmailVerified: boolean;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(userProfileData:any) {
    this.id = userProfileData.id;
    this.name = userProfileData.name;
    this.username = userProfileData.username;
    this.email = userProfileData.email;
    this.contactNumber = userProfileData.contactNumber;
    this.gender = userProfileData.gender;
    this.role = userProfileData.role;
    this.address = userProfileData.address;
    this.isEmailVerified = userProfileData.isEmailVerified;
    this.isVerified = userProfileData.isVerified;
    this.createdAt = userProfileData.createdAt;
    this.updatedAt = userProfileData.updatedAt;
  }
}
