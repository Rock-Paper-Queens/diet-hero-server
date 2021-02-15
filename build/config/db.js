"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("./config"));
const env = process.env.NODE_ENV || "development";
exports.sequelize = new sequelize_1.Sequelize(config_1.default[env].database, config_1.default[env].username, config_1.default[env].password, {
    host: config_1.default[env].host,
    dialect: "mysql",
    define: config_1.default[env].define,
});
