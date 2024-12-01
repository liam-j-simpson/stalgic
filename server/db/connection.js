"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var knex_1 = require("knex");
var knexfile_1 = require("./knexfile");
var env = process.env.NODE_ENV || 'development';
var connection = (0, knex_1.default)(knexfile_1.default[env]);
exports.default = connection;
