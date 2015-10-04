/*!
 * unixify <https://github.com/jonschlinkert/unixify>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var normalize = require('normalize-path');

module.exports = function unixify(fp) {
  return normalize(fp).replace(/^\w+:/, '');
};
