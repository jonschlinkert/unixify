'use strict';

require('mocha');
var assert = require('assert');
var unixify = require('./');

describe('unixify', function() {
  it('should convert backslashes to forward slashes', function() {
    assert.equal(unixify('one\\two\\three'), 'one/two/three');
  });

  it('should strip trailing slashes', function() {
    assert.equal(unixify('one/two/three/'), 'one/two/three');
    assert.equal(unixify('one\\two\\three\\'), 'one/two/three');
  });

  it('should not strip trailing slashes when disabled', function() {
    assert.equal(unixify('one\\two\\three\\', false), 'one/two/three/');
    assert.equal(unixify('one/two/three/', false), 'one/two/three/');
  });

  it('should strip leading `./`', function() {
    assert.equal(unixify('.\\one\\two\\three\\'), 'one/two/three');
    assert.equal(unixify('./one/two/three/'), 'one/two/three');
  });

  it('should condense multiple slashes to one', function() {
    assert.equal(unixify('one\\two\\//three'), 'one/two/three');
    assert.equal(unixify('one//two//////three'), 'one/two/three');
  });

  it('should strip windows drive letters', function() {
    assert.equal(unixify('C:////one//two//three'), '/one/two/three');
    assert.equal(unixify('C:////one//two//three'), '/one/two/three');
    assert.equal(unixify('C://one//two//three'), '/one/two/three');
    assert.equal(unixify('C:/one/two/three'), '/one/two/three');
    assert.equal(unixify('C:\\//one\\//two\\//three'), '/one/two/three');
    assert.equal(unixify('C:\\//one\\two\\three'), '/one/two/three');
    assert.equal(unixify('C:\\\\one\\two\\three'), '/one/two/three');
    assert.equal(unixify('C:\\one\\two\\three'), '/one/two/three');
  });

  it('should condense multiple slashes following drive letter', function() {
    assert.equal(unixify('C:\\//one\\two\\//three'), '/one/two/three');
  });
});
