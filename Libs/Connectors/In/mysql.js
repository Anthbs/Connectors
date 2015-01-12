/*jslint node: true */
"use strict";

var q = require('q');
var util = require('util');
var base_connection = require('../base_connection.js');
var mysql = require('mysql');
var mysqlUtilities = require('utilities');



function MySqlConnection(address, port, username, password) {
    base_connection.apply(this, ["MySql", "In"]); //Type, Direction

    this.address = address;
    this.port = port;
    this.username = username;
    this.password = password;
}

util.inherits(MySqlConnection, base_connection);

MySqlConnection.prototype.Connect = function () {
    var deferred = q.defer();

    this.connection = mysql.createConnection({
        host: this.address,
        port: this.port,
        user: this.username,
        password: this.password
    });
    this.connection.connect(function (err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            deferred.reject();
        }

        console.log('connected as id ' + this.connection.threadId);
        mysqlUtilities.upgrade(this.connection);
        mysqlUtilities.introspection(this.connection);
        deferred.resolve(this.connection);
    });

    return deferred.promise;
};
