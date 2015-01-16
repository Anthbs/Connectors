/*jslint node: true */
"use strict";

var Connectors = require('./Libs/Connectors');
var SME = require('./DatabaseSettings/SME');

var ms_connector = new Connectors.In.MySql("localhost", 3306, "sme", "root", "Anthbs");
var rest_connector = new Connectors.Out.Rest("/api/", 5000, ms_connector);

ms_connector.Connect().then(function (connection) {
    ms_connector.Models().then(function (models) {
        rest_connector.Start(SME);
    });
});
