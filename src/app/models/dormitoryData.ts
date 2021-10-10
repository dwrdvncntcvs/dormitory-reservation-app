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
        console.log(paid);
        bothArray.push(paid);
      }
      console.log(bothArray.length);
      this.numberOfUnPayedDormitoryBoth = bothArray.length;
    }

    for (let paid of this.maleGenderDormitory) {
      if (paid.isPayed === false) {
        console.log(paid);
        maleArray.push(paid);
      }
      console.log(maleArray.length);
      this.numberOfUnPayedDormitoryMale = maleArray.length;
    }

    for (let paid of this.femaleGenderDormitory) {
      if (paid.isPayed === false) {
        console.log(paid);
        femaleArray.push(paid);
      }
      console.log(femaleArray.length);
      this.numberOfUnPayedDormitoryFemale = femaleArray.length;
    }
  }
}
