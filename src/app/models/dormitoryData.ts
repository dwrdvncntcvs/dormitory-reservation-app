export class DormitoryData {
  dormitoryData: any;
  numberOfDormitory: any;

  constructor(dormitoryData) {
    this.dormitoryData = dormitoryData['dormitories'];
    this.numberOfDormitory = this.dormitoryData.length;
  }
}
