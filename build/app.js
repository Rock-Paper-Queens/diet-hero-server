"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const coin_1 = __importDefault(require("./api/coin"));
const app = express_1.default();
exports.app = app;
app.use("/api", coin_1.default);
