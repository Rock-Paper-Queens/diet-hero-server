"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Coin = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
class Coin extends sequelize_1.Model {
}
exports.Coin = Coin;
Coin.init({
    id: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    symbol: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    market_cap_rank: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    price_change_percentage_24h: {
        type: sequelize_1.DataTypes.STRING,
    },
    price_change_percentage_7d: {
        type: sequelize_1.DataTypes.STRING,
    },
    market_cap: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    total_volume: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    chart_data: {
        type: sequelize_1.DataTypes.TEXT,
        get() {
            return this.getDataValue("chart_data").split(";");
        },
        set(val) {
            return this.setDataValue("chart_data", val.join(";"));
        },
    },
}, {
    sequelize: db_1.sequelize,
    modelName: "Coin",
});
console.log(Coin);
