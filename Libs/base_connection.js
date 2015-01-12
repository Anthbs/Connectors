/*jslint node: true */
"use strict";

var q = require('q');

function BaseConnection(type, direction) {
    this.type = type;
    this.direction = direction;
}

BaseConnection.prototype.getType = function () {
    return this.type;
};

BaseConnection.prototype.getDirection = function () {
    return this.direction;
};

BaseConnection.prototype.Connect = function () {
    var deferred = q.defer();
    deferred.resolve({
        success: true
    });
    return deferred.promise;
};

BaseConnection.prototype.Authenticate = function () {
    var deferred = q.defer();
    deferred.resolve({
        success: true
    });
    return deferred.promise;
};



module.exports = BaseConnection;
