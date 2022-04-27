const fs = require("fs");
const scredJson = require('./socialcred.json');
const sClass = class {
  constructor() {
    let rawData = fs.readFileSync('socialcred.json');
    let newDict = JSON.parse(rawData);
    this.socialcredDict = newDict;
  }
  fetchSocialCredit(usr) {
    if (typeof this.socialcredDict[usr] === "undefined") {
      this.socialcredDict[usr] = 0;
      return this.socialcredDict[usr];
    } else {
      return this.socialcredDict[usr];
    }
  }
  changeSocialCredit(usr,amount) {
    if (typeof this.socialcredDict[usr] === "undefined") {
      this.socialcredDict[usr] = 0;
    }
    this.socialcredDict[usr] += amount;
  }
  saveSocialCredit() {
    let data = JSON.stringify(this.socialcreditDict);
    fs.writeFileSync('socialcred.json', data);
  }
}
const sclass = new sClass();
module.exports = sclass;