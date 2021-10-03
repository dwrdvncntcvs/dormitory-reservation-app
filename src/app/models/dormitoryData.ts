export class DormitoryData {
  bothGenderDormitory: any = [];
  maleGenderDormitory: any = [];
  femaleGenderDormitory: any = [];

  numberOfBothGenderDormitory: number;
  numberOfMaleGenderDormitory: number;
  numberOfFemaleGenderDormitory: number;

  constructor(dormitoryData) {
    this.bothGenderDormitory = dormitoryData['bothDormitories'];
    this.numberOfBothGenderDormitory = this.bothGenderDormitory.length;
    this.maleGenderDormitory = dormitoryData['maleDormitories'];
    this.numberOfMaleGenderDormitory = this.maleGenderDormitory.length;
    this.femaleGenderDormitory = dormitoryData['femaleDormitories'];
    this.numberOfFemaleGenderDormitory = this.femaleGenderDormitory.length;
  }
}
