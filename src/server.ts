import { app } from "./app";
import { sequelize as db } from "./config/db";

import logger from "./config/logger";
import { Coin } from "./models/coin";
import { loadCoinList } from "./services/coin-data";
import { EScheduleTypes, EIntervalCrons, scheduler } from "./utils/scheduler";

const ENV = process.env.NODE_ENV;
const PORT = process.env.port || 8000;

const start = async () => {
	try {
		await db.authenticate();
		logger.info(`MYSQL connection has been established in the Server: ${PORT}`);
		await Coin.sync({ force: true });
		logger.info("All models were synchronized successfully.");
		await loadCoinList().then(() => {
			logger.info("scheduler has been scheduled ");
		});
		// scheduler({
		// 	scheduleType: EScheduleTypes.HOURLY,
		// 	interval: EIntervalCrons.HOURLY,
		// 	callback: loadCoinList,
		// 	taskDescription: "Load coindata hourly basis",
		// });
	} catch (err) {
		logger.error(err);
	}

	app.listen(PORT, () => {
		logger.info(
			`app listening to ${PORT} - current environment setting is ${ENV}`
		);
	});
};

start();
