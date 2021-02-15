"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const coin_1 = require("../controllers/coin");
const router = express_1.default.Router();
router.get("/coin/list", (req, res) => {
    return coin_1.loadCoins(req, res);
});
exports.default = router;
