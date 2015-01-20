/*jslint node: true */
"use strict";

var Connectors = require('./Libs/Connectors');
var SME = require('./DatabaseSettings/SME');
var MapQuest = require('./DatabaseSettings/MapQuest');

var ms_connector = new Connectors.In.MySql("localhost", 3306, "sme", "root", "Anthbs");
var mapquest_connector = new Connectors.In.MapQuest('Fmjtd%7Cluubn10ylu%2C75%3Do5-90rllr');
var rest_connector = new Connectors.Out.Rest("/api/", 5000, mapquest_connector);

mapquest_connector.Connect().then(function (connection) {
    rest_connector.Start(MapQuest);
});
