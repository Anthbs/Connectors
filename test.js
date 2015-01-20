/*jslint node: true */
"use strict";

var Connectors = require('./Libs/Connectors');
var agf_crop_estimation = require('./DatabaseSettings/agf_crop_estimation');
var com_settings = require('./DatabaseSettings/COMPORT');

var ms_connector = new Connectors.In.MySql("localhost", 3306, "agf_crop_estimation", "root", "Anthonybs123");
var com_connector = new Connectors.In.COM("COM5", '\r\n', 'p\r\n', 9600, 8, 1, 'none', true, true);
var rest_connector = new Connectors.Out.Rest("/api/", 5000, com_connector);

/* MYSQL
ms_connector.Connect().then(function (connection) {
    ms_connector.Models().then(function (models) {
        rest_connector.Start(agf_crop_estimation);
    });
});
*/

/* COM */
com_connector.Connect().then(function (connection) {
    com_connector.Models().then(function (models) {
        rest_connector.Start(com_settings);
    });
});
