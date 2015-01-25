var parser = require('..');
var assert = require('assert');

describe('parse-http-header', function() {

  it('should return empty when I parse an empty string', function() {
    var params = parser('');
    //assert.equal(params.length, 1);
    assert.equal(params[0], '');
  });

  it('should return type when I parse a type', function() {
    var params = parser('application/json');
    //assert.equal(params.length, 1);
    assert.equal(params[0], 'application/json');
  });

  it('should return type when I parse a type and separator', function() {
    var params = parser('application/json;');
    //assert.equal(params.length, 1);
    assert.equal(params[0], 'application/json');
  });

  it('should return type and param when I parse a type and param', function() {
    var params = parser('application/json; charset=utf8');
    //assert.equal(params.length, 2);
    assert.equal(params[0], 'application/json');
    assert.equal(params['charset'], 'utf8');
  });

});