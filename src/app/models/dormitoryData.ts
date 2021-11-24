export class DormitoryData {
  bothGenderDormitory: any = [];
  maleGenderDormitory: any = [];
  femaleGenderDormitory: any = [];

  numberOfUnPayedDormitoryBoth: number;
  numberOfUnPayedDormitoryMale: number;
  numberOfUnPayedDormitoryFemale: number;

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

    const bothArray = [];
    const maleArray = [];
    const femaleArray = [];

    for (let paid of this.bothGenderDormitory) {
      if (paid.isPayed === false) {
        bothArray.push(paid);
      }

      this.numberOfUnPayedDormitoryBoth = bothArray.length;
    }

    for (let paid of this.maleGenderDormitory) {
      if (paid.isPayed === false) {
        maleArray.push(paid);
      }

      this.numberOfUnPayedDormitoryMale = maleArray.length;
    }

    for (let paid of this.femaleGenderDormitory) {
      if (paid.isPayed === false) {
        femaleArray.push(paid);
      }

      this.numberOfUnPayedDormitoryFemale = femaleArray.length;
    }
  }
}
