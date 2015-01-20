/*jslint node: true */
"use strict";

var q = require('q');
var util = require('util');
var base_connection = require('../../base_connection.js');
var serialport = require("serialport");
var SerialPort = require("serialport").SerialPort
var _ = require('underscore');


function COMConnection(port, parserCommand, readCommand, baudRate, dataBits, stopBits, parity, xon, xoff) {
    base_connection.apply(this, ["COM", "In"]); //Type, Direction

    this.port = port;
    this.readCommand = readCommand || '';
    this.settings = {
        baudrate: baudRate || 9600,
        databits: dataBits || 8,
        stopbits: stopBits || 1,
        parity: parity || 'none',
        xon: xon || true,
        xoff: xoff || true,
        parser: serialport.parsers.readline(parserCommand || '\r\n')
    };
}

util.inherits(COMConnection, base_connection);

COMConnection.prototype.Connect = function () {
    var deferred = q.defer();

    this.connection = new SerialPort(this.port, this.settings);
    this.connection.on('error', function (err) {
        console.log(err);
    });
    this.connection.close(function (res) {
        console.log(res);
        this.connection.open(function (error) {
            if (error) {
                console.log('COMConnection: failed to open: ' + error);
            } else {
                console.log('COMConnection: opened' + this.port);
            }
            deferred.resolve(error);
        }.bind(this));
    }.bind(this));

    return deferred.promise;
};

COMConnection.prototype.Databases = function () {
    var deferred = q.defer();

    deferred.resolve([]);

    return deferred.promise;
};

COMConnection.prototype.Models = function () {
    var deferred = q.defer();

    deferred.resolve([]);

    return deferred.promise;
};

COMConnection.prototype.Fields = function (model) {
    var deferred = q.defer();

    deferred.resolve([]);

    return deferred.promise;
};



COMConnection.prototype.Get = function () {
    var deferred = q.defer();

    console.log("Getting COM data");
    var lines = [];
    this.connection.on('data', function(data) {
        lines.push(data);
        if(lines != null && lines.length == 3) {
            deferred.resolve(lines);
        }
    });

    this.connection.write(this.readCommand, function (err, results) {
        if (err != null) {
            console.log('err ' + err);
            return deferred.reject(err);
        }
    });

    return deferred.promise;
};


module.exports = COMConnection;
