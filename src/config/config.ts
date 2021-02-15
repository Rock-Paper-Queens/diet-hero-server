import dotenv from "dotenv";
dotenv.config();

const config = {
	development: {
		username: process.env.MYSQL_USERNAME,
		password: process.env.MYSQL_PASSWORD,
		database: process.env.MYSQL_NAME,
		host: process.env.MYSQL_HOST,
		dialect: process.env.MYSQL_DIALECT,
		define: {
			freezeTableName: true, // sequelize는 복수형으로 table을 만드는데 그것을 방지한다.
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

export default config;
