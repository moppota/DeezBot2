const fs = require('fs')
let rawData = fs.readFileSync('censor.json');
let censorDict = JSON.parse(rawData);
let censorDictClass = class {
  constructor() {
    this.cenDict = censorDict;
  }
  saveDict() {
    let dumpData = JSON.stringify(this.cenDict);
    fs.writeFileSync('censor.json',dumpData);
  }
}
const newCensorClass = new censorDictClass();
module.exports = newCensorClass;