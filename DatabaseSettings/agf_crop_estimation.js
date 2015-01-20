/*jslint node: true */
"use strict";

module.exports = [
    {
        url: "runs/orchards",
        primary_table: "runs",
        required_tables: [
            { identifier: "o", table_from: { table: "runs", field: "id" }, table_to: { table: "orchards", field: "run_id" } }
        ],
        fields: [
            { table_identifier: "runs", field: "id",    identifier: "id" },
            { table_identifier: "runs", field: "name",  identifier: "run_name" },
            { table_identifier: "o",    field: "id",    identifier: "orchard_id" },
            { table_identifier: "o",    field: "pin",   identifier: "orchard_kpin" },
            { table_identifier: "o",    field: "name",  identifier: "orchard_name" }
        ],
        parameters: [
        ]
    },
    {
        url: "runs/:run_id/orchards",
        primary_table: "runs",
        required_tables: [
            { identifier: "o", table_from: { table: "runs", field: "id" }, table_to: { table: "orchards", field: "run_id" } }
        ],
        fields: [
            { table_identifier: "runs", field: "id",    identifier: "id" },
            { table_identifier: "runs", field: "name",  identifier: "run_name" },
            { table_identifier: "o",    field: "id",    identifier: "orchard_id" },
            { table_identifier: "o",    field: "pin",   identifier: "orchard_kpin" },
            { table_identifier: "o",    field: "name",  identifier: "orchard_name" }
        ],
        parameters: [
            { identifier: "runs", key: "id", operation: "=", placeholder: "run_id" }
        ]
    }
];
