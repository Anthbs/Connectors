/*jslint node: true */
"use strict";
var each = require('mekanika-utils-each');
var Connectors = require('./Libs/Connectors');

var ms_connector = new Connectors.In.MySql("localhost", 3306, "sme", "root", "Anthbs");
ms_connector.Connect().then(function (connection) {
    ms_connector.Models(database).then(function (models) {
        each(function (model) {
            ms_connector.Fields(database, model).then(function (fields) {
                console.log("DB: " + database + " Model: " + model + " Fields: " + Object.keys(fields).length);
            });
        }, models);
    });
});
