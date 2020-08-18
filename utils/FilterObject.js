const pick = require("lodash/pick");

class FilterObject {
  constructor(obj, allowedFields) {
    this.obj = obj;
    this.allowedFields = allowedFields;
  }

  filters() {
    const newObj = pick(this.obj, this.allowedFields);
    return newObj;
  }
}

module.exports = FilterObject;
