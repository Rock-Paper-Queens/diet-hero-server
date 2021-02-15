declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: "development" | "production" | "test";
			PORT?: number;
			MYSQL_HOST: string;
			MYSQL_USERNAME: string;
			MYSQL_PASSWORD: string;
			MYSQL_NAME: string;
			MYSQL_DIALECT: string;
		}
	}
}

export {};
