import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize as db } from "../config/db";

export class Coin extends Model {}

Coin.init(
	{
		id: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
		},

		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		symbol: {
			type: DataTypes.STRING,
			allowNull: false,
		},

		market_cap_rank: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		image: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		price: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		price_change_percentage_24h: {
			type: DataTypes.STRING,
		},
		price_change_percentage_7d: {
			type: DataTypes.STRING,
		},
		market_cap: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		total_volume: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		chart_data: {
			type: DataTypes.TEXT,
			get() {
				return this.getDataValue("chart_data").split(";");
			},
			set(val: any[]) {
				return this.setDataValue("chart_data", val.join(";"));
			},
		},
	},
	{
		sequelize: db,
		modelName: "Coin",
	}
);

console.log(Coin);
