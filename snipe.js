let snipeClass = class {
  constructor() {
    this.snipeDict = {
      "":""
    }
  }
  fetchDict(thing) {
    const fetched = this.snipeDict[thing];
    return fetched;
  }
  writeDict(thingtowrite, channel) {
    this.snipeDict[channel] = thingtowrite;
  }
}
const snipe = new snipeClass();
module.exports = snipe;