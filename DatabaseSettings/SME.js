/*jslint node: true */
"use strict";

module.exports = [
    {
        url: "users",
        primary_table: "users",
        required_tables: [
            { identifier: "p", table_from: { table: "users", field: "person_id" }, table_to: { table: "people", field: "id" } }
        ],
        fields: [
            { table_identifier: "users", field: "username", identifier: "username" },
            { table_identifier: "p", field: "first_name", identifier: "first_name" },
            { table_identifier: "p", field: "last_name", identifier: "last_name" }
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
            { table_identifier: "users", field: "username", identifier: "username" },
            { table_identifier: "p", field: "first_name", identifier: "first_name" },
            { table_identifier: "p", field: "last_name", identifier: "last_name" }
        ],
        parameters: [
            { identifier: "users", key: "id", operation: "=", placeholder: "user_id" }
        ]
    },
    {
        url: "people",
        primary_table: "people",
        required_tables: [
        ],
        fields: [
            { table_identifier: "people", field: "id", identifier: "id" },
            { table_identifier: "people", field: "first_name", identifier: "first_name" },
            { table_identifier: "people", field: "last_name", identifier: "last_name" }
        ],
        parameters: [
        ]
    }
];
