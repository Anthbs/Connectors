//APP KEY: Fmjtd%7Cluubn10ylu%2C75%3Do5-90rllr

/*jslint node: true */
"use strict";

var q = require('q');
var util = require('util');
var base_connection = require('../../base_connection.js');
var requestify = require('requestify');
var _ = require('underscore');


function MapQuestConnection(api_key) {
    base_connection.apply(this, ["MapQuest", "In"]); //Type, Direction

    this.api_key = api_key || 'Fmjtd%7Cluubn10ylu%2C75%3Do5-90rllr';
}

util.inherits(MapQuestConnection, base_connection);

MapQuestConnection.prototype.Connect = function () {
    var deferred = q.defer();

    deferred.resolve();

    return deferred.promise;
};

//null, null, null, [],[]
MapQuestConnection.prototype.Get = function (model, join_tables, fields, parameters, values) {
    var deferred = q.defer();



    return deferred.promise;
};

//null, null, null, [],[]
MapQuestConnection.prototype.Post = function (model, join_tables, fields, parameters, values, data) {
    var deferred = q.defer();

    if(model == 'elevations') {
        this.GetElevation(data.points).then(function (res) {
            deferred.resolve(res);
        });
    }

    return deferred.promise;
};

//[{lat, lon}]
MapQuestConnection.prototype.GetElevation = function (points) {

    var post_data = {
        key: this.api_key,
        inFormat: 'json',
        latLngCollection: points,
        unit: 'm'
    };

    return requestify.post('http://open.mapquestapi.com/elevation/v1/profile?key=' + this.api_key, post_data).then(function (response) {
        console.log(response.getBody());
        return response.getBody();
    });
}

module.exports = MapQuestConnection;
