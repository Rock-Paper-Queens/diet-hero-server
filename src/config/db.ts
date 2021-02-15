import { Sequelize } from "sequelize";
import config from "./config";

const env = process.env.NODE_ENV || "development";

export const sequelize = new Sequelize(
	config[env].database,
	config[env].username,
	config[env].password,
	{
		host: config[env].host,
		dialect: "mysql",
		define: config[env].define,
	}
);
