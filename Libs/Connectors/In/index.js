/*jslint node: true */
"use strict";

var MySql = require('./mysql.js');
var Rest = require('./rest.js');
var COM = require('./com.js');

module.exports = {
    MySql: MySql,
    Rest: Rest,
    COM: COM
};
