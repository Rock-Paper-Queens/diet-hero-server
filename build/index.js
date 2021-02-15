"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const db_1 = require("./config/db");
const logger_1 = __importDefault(require("./config/logger"));
const ENV = process.env.NODE_ENV;
const PORT = process.env.port || 8000;
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.sequelize.authenticate();
        logger_1.default.info(`MYSQL connection has been established in the Server:${PORT}`);
    }
    catch (err) {
        logger_1.default.error(err);
    }
    app_1.app.listen(PORT, () => {
        logger_1.default.info(`app listening to ${PORT} - current environment setting is ${ENV}`);
    });
});
start();
