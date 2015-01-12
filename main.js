/*jslint node: true */
"use strict";

var Connectors = require('./Libs/Connectors');

var ms_connector = new Connectors.In.MySql("localhost", 3306, "root", "Anthbs");
ms_connector.Connect().then(function (connection) {
    ms_connector.Databases().then(function (databases) {
        console.dir({
            databases: databases
        });
        databases.forEach(function (database) {
            ms_connector.Models(database).then(function (models) {
                console.dir({
                    models: models
                });
            });
        });
    });
});
