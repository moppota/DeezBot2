const fs = require('fs');
let moneyDict_class = class {
  constructor() {
    let rawData = fs.readFileSync('moneydict.json');
    let newDict = JSON.parse(rawData);
    let rawData2 = fs.readFileSync('worship.json');
    let shipDict = JSON.parse(rawData2);
    let rawData3 = fs.readFileSync('multiplier.json');
    let multiDict = JSON.parse(rawData3);
    this.moneyDict = newDict;
    this.worshipDict = shipDict;
    this.multiplierDict = multiDict;
  }
  changeMulti(entry, amount) {
    if(this.multiplierDict[entry] === null || this.multiplierDict[entry] === undefined || this.multiplierDict[entry] === NaN) {
      this.multiplierDict[entry] = 1;
    }
    this.multiplierDict[entry] += amount;
  }
  changeMoney(entry,amount) {
    if(this.moneyDict[entry] === null || this.moneyDict[entry] === undefined || this.moneyDict[entry] === NaN) {
      this.moneyDict[entry] = 0;
    }
    this.moneyDict[entry] += amount;
    console.log(amount)
  }
  changeShip(entry,amount) {
    if(this.worshipDict[entry] === null || this.worshipDict[entry] === undefined || this.worshipDict[entry] === NaN) {
      this.worshipDict[entry] = 0;
    }
    this.worshipDict[entry] += amount;
    console.log(amount)
  }
  writeMoney() {
    let data = JSON.stringify(this.moneyDict);
    fs.writeFileSync('moneydict.json', data);
    let data2 = JSON.stringify(this.worshipDict);
    fs.writeFileSync('worship.json', data2);
    let data3 = JSON.stringify(this.multiplierDict);
    fs.writeFileSync('multiplier.json', data3);
  }
}
const moneydictionary = new moneyDict_class();
module.exports = moneydictionary;