/*jslint node: true */
"use strict";

var q = require('q');
var util = require('util');
var base_connection = require('../../base_connection.js');
var mysql = require('mysql');
var mysqlUtilities = require('mysql-utilities');
var _ = require('underscore');



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
    }.bind(this));

    return deferred.promise;
};

MySqlConnection.prototype.UseDB = function (database) {
    var deferred = q.defer();

    this.connection.query("USE " + database + ";", function (err, rows) {
        if (err) {
            console.log(err);
            return deferred.reject(err);
        }
        deferred.resolve(rows);
    });

    return deferred.promise;
};

MySqlConnection.prototype.Databases = function () {
    var deferred = q.defer();

    this.connection.databases(function (err, databases) {
        if (err) {
            console.log(err);
            return deferred.reject(err);
        }
        deferred.resolve(_.without(databases, 'mysql', 'information_schema', 'performance_schema'));
    });

    return deferred.promise;
};

MySqlConnection.prototype.Models = function (database) {
    var deferred = q.defer();

    this.connection.databaseTables(database, function (err, tables) {
        if (err) {
            console.log(err);
            return deferred.reject(err);
        }
        deferred.resolve(_.pluck(tables, 'TABLE_NAME'));
    });

    return deferred.promise;
};

MySqlConnection.prototype.Fields = function (database, model) {
    var deferred = q.defer();

    this.connection.db_fields(database, model, function (err, fields) {
        if (err) {
            console.log(err);
            return deferred.reject(err);
        }
        deferred.resolve(fields);
    });

    return deferred.promise;
};

module.exports = MySqlConnection;
