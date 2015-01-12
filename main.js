/*jslint node: true */
"use strict";

var Connectors = require('./Libs/Connectors');

var ms_connector = new Connectors.In.MySql("localhost", 3306, "root", "Anthbs");
ms_connector.Connect().then(function () {
    ms_connector.Databases();
});
