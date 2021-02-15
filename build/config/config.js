"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    development: {
        username: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_NAME,
        host: process.env.MYSQL_HOST,
        dialect: process.env.MYSQL_DIALECT,
        define: {
            freezeTableName: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
    },
    test: {
        username: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_NAME,
        host: process.env.MYSQL_HOST,
        dialect: process.env.MYSQL_DIALECT,
        define: {
            freezeTableName: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
    },
    production: {
        username: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_NAME,
        host: process.env.MYSQL_HOST,
        dialect: process.env.MYSQL_DIALECT,
        define: {
            freezeTableName: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
    },
};
exports.default = config;
