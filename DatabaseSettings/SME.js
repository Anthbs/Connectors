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
            { identifier: "users", field: "username" },
            { identifier: "p", field: "first_name" },
            { identifier: "p", field: "last_name" }
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
            { identifier: "p", field: "last_name" }
        ],
        parameters: [
            { identifier: "users", key: "id", operation: "=", placeholder: "user_id" }
        ]
    }
];
