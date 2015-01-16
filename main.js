/*jslint node: true */
"use strict";

var Connectors = require('./Libs/Connectors');

var ms_connector = new Connectors.In.MySql("localhost", 3306, "sme", "root", "Anthbs");
var rest_connector = new Connectors.Out.Rest("/api/", 5000, ms_connector);

ms_connector.Connect().then(function (connection) {
    ms_connector.Models().then(function (models) {
        rest_connector.Start([
            {
                url: "users",
                primary_table: "users",
                required_tables: [
                    { identifier: "p", table_from: { table: "users", field: "person_id" }, table_to: { table: "people", field: "id" } }
                ],
                fields: [
                    { identifier: "users", field: "username" },
                    { identifier: "p", field: "first_name" },
                    { identifier: "p", field: "last_name" },
                ],
                parameters: [
                ]
            },
            {
                url: "users",
                primary_table: "users",
                required_tables: [
                    { identifier: "p", table_from: { table: "users", field: "person_id" }, table_to: { table: "people", field: "id" } }
                ],
                fields: [
                    { identifier: "users", field: "username" },
                    { identifier: "p", field: "first_name" },
                    { identifier: "p", field: "last_name" },
                ],
                parameters: [
                    { identifier: "users", key: "id", operation: "=", placeholder: "user_id" }
                ]
            }
        ]);
    });
});
