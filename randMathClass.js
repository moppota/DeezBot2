function between(min, max) {
  return Math.floor(
    Math.random() * (max-min) + min
  )
}
let mathClass = class {
  constructor() {
    this.operatorList = [" + "," - "," * "];
    this.NumbList = ["1","2","3","4","5","6","7","8","9"];
  }
  getEquation() {
    let equation = "";
    for(let i = 0;i <= 4; ++i) {
      if(i % 2 == 0 || i == 0) {
        equation += this.NumbList[between(0,8)];
      } else {
        equation += this.operatorList[between(0,4)];
      }
    }
    return equation;
  }
}
const mathClass2 = new mathClass();
module.exports = mathClass2;
