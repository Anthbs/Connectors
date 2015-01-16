/*jslint node: true */
"use strict";

var q = require('q');
var util = require('util');
var base_connection = require('../../base_connection.js');
var mysql = require('mysql');
var mysqlUtilities = require('mysql-utilities');
var _ = require('underscore');



function MySqlConnection(address, port, database, username, password) {
    base_connection.apply(this, ["MySql", "In"]); //Type, Direction

    this.address = address;
    this.port = port;
    this.username = username;
    this.password = password;
    this.database = database;
}

util.inherits(MySqlConnection, base_connection);

MySqlConnection.prototype.Connect = function () {
    var deferred = q.defer();

    this.connection = mysql.createConnection({
        host: this.address,
        port: this.port,
        user: this.username,
        password: this.password,
        database: this.database
    });
    this.connection.connect(function (err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            deferred.reject();
        }

        //console.log('connected as id ' + this.connection.threadId);
        mysqlUtilities.upgrade(this.connection);
        mysqlUtilities.introspection(this.connection);
        deferred.resolve(this.connection);
    }.bind(this));

    return deferred.promise;
};

MySqlConnection.prototype.UseDB = function (database) {
    var deferred = q.defer();

    if (this.connection != null) {
        this.connection.end();
    }

    this.connection = mysql.createConnection({
        host: this.address,
        port: this.port,
        user: this.username,
        password: this.password,
        db: this.database
    });

    connection.connect(function (err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            deferred.reject();
        }

        console.log('connected as id ' + this.connection.threadId);
        mysqlUtilities.upgrade(this.connection);
        mysqlUtilities.introspection(this.connection);
        deferred.resolve(this.connection);
    }.bind(this));

    return deferred.promise;
};

MySqlConnection.prototype.Databases = function () {
    var deferred = q.defer();

    this.connection.databases(function (err, databases) {
        if (err) {
            console.log(err);
            return deferred.reject(err);
        }
        deferred.resolve(_.without(databases, 'mysql', 'information_schema', 'performance_schema'));
    });

    return deferred.promise;
};

MySqlConnection.prototype.Models = function () {
    var deferred = q.defer();

    this.connection.tables(function (err, tables) {
        if (err) {
            console.log(err);
            return deferred.reject(err);
        }
        deferred.resolve(_.pluck(tables, 'TABLE_NAME'));
    });

    return deferred.promise;
};

MySqlConnection.prototype.Fields = function (model) {
    var deferred = q.defer();

    this.connection.fields(model, function (err, fields) {
        if (err) {
            console.log(err);
            return deferred.reject(err);
        }
        deferred.resolve(fields);
    });

    return deferred.promise;
};

MySqlConnection.prototype.QueryBuilder = function (model, join_tables, fields, parameters, values) {
    var fields_query = [];
    var joins_query = [];
    var parameters_query = [];
    var pq = "SELECT<%= fields_query %> FROM <%= model %><%= joins_query %>";
    if(parameters != null && parameters.length > 0) {
        pq += " WHERE<%= parameters_query %>";
    }

    var template = _.template(pq);
    var fields_template = _.template(" <%= identifier %>.<%= field %>");
    var parameter_template = _.template(" <%= identifier %>.<%= key %> <%= operation %> <%= value %>");
    var join_table_template = _.template(" JOIN <%= table_to.table %> <%= identifier %> ON <%= table_from.table %>.<%= table_from.field %> = <%= identifier %>.<%= table_to.field %>");

    if (fields != null && fields.length > 0) {
        fields.forEach(function (field) {
            fields_query.push(fields_template(field));
        });
    } else {
        fields.push("*");
    }

    if (join_tables != null && join_tables.length > 0) {
        join_tables.forEach(function (join_table) {
            joins_query.push(join_table_template(join_table));
        });
    }

    if (parameters != null && parameters.length > 0) {
        parameters.forEach(function (parameter) {
            parameter.value = values[parameter.placeholder];
            parameters_query.push(parameter_template(parameter));
        });
    }

    return template({
        model: model,
        fields_query: fields_query.join(","),
        joins_query: joins_query.join(" "),
        parameters_query: parameters_query.join(" AND ")
    });
};

MySqlConnection.prototype.Get = function (model, join_tables, fields, parameters, values) {
    var deferred = q.defer();

    var query = this.QueryBuilder(model, join_tables, fields, parameters, values);
    console.log(query);
    this.connection.query(query, function (err, fields) {
        if (err) {
            console.log(err);
            return deferred.reject(err);
        }
        deferred.resolve(fields);
    });

    return deferred.promise;
};



module.exports = MySqlConnection;
