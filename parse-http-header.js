function Param (string) {
  var SEPARATOR = /(?:;|,)/g
    , OPERATOR = /=/;
  if (string && SEPARATOR.test(string) && OPERATOR.test(string)) {
    string.split(SEPARATOR).forEach(function (param, idx) {
      var parts = param.split(OPERATOR).map(function (part) { return part.trim(); });
      if (parts.length === 2) {
        this[parts[0]] || (this[parts[0]] = {});
        this[parts[0]] = parts[1];
        this[idx] = {};
        this[idx][parts[0]] = parts[1];
      }
      else {
        this[idx] = param;
      }
    }, this);
  }
  return this;
}

Param.prototype.toArray = function () {
  return Object.keys(this).filter(function (key) {
    return !isNaN(+key);
  }).map(function (key) {
    return this[key];
  }, this);
};

/**
 * Parse parameterized HTTP header value string into an object
 */
module.exports = function parseHttpHeader (string) {
  Param.prototype.toString = function toString () {
    return string;
  };

  return new Param(string);
};
