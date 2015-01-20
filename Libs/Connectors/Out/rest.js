/*jslint node: true */
"use strict";

var each = require('mekanika-utils-each');
var express = require("express");
var bodyParser = require('body-parser');
var _ = require('underscore');
var q = require('q');



function Rest(base_path, port, in_connector) {
    this.base_path = base_path;
    this.port = port;
    this.in_connector = in_connector;
    this.routes = [];
}

/* Example Mappings - SME Database
[
    {
        url: "users",
        primary_table: "users",
        required_tables: [
            { identifier: "p", table_from: { table: "users", field: "person_id" }, table_to: { table: "people", field: "id" } }
        ],
        fields: [
            { identifier: "users", field: "username" }
            { identifier: "p", field: "first_name" }
            { identifier: "p", field: "last_name" }
        ],
        parameters: [
            { identifier: "users", key: "id" }
        ]
    }
]
*/
Rest.prototype.Start = function (mappings) {
    this.app = express();
    this.app.use(bodyParser.json());

    var mappings_promises = [];
    each(function (mapping) {
        mappings_promises.push(this.CreateRoute(mapping));
    }.bind(this), mappings);

    q.all(mappings_promises).then(function () {
        this.app.route(this.base_path + "routes").get(function (req, res) {
            res.json(this.routes);
        }.bind(this));
        this.app.listen(this.port);
        console.log("Rest API started: " + this.port);
    }.bind(this));
};

Rest.prototype.Stop = function () {

};

Rest.prototype.CreateRoute = function (mapping) {
    var deferred = q.defer();

    this.app.route(this.base_path + mapping.url).get(function (req, res) {
        var promise_route = this.in_connector.Get(mapping.primary_table, mapping.required_tables, mapping.fields, mapping.parameters, req.params).then(function (results) {
            res.json(results);
            return results;
        });
    }.bind(this));
    this.routes.push(this.base_path + mapping.url);

    deferred.resolve();
    console.log("Created Route: " + this.base_path + mapping.url);
    return deferred.promise;
};

module.exports = Rest;
