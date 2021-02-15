import winston, { transport } from "winston";
import winstonDaily from "winston-daily-rotate-file";
import appRoot from "app-root-path";
import process from "process";

const logDir = `${appRoot}/logs`;

const { combine, timestamp, label, printf } = winston.format;

const logFormat = printf(({ level, message, label, timestamp }): string => {
	return `${timestamp} [${label}] ${level}: ${message}`;
});

/*
Log Level
error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, misc: 6
*/
const logger = winston.createLogger({
	format: combine(
		label({
			label: "Diet-Hero",
		}),
		timestamp({
			format: "YYYY-MM-DD HH:mm:ss",
		}),
		logFormat
	),
	transports: [
		new winstonDaily({
			level: "info",
			datePattern: "YYYY-MM-DD",
			dirname: logDir,
			filename: "%DATE%.log",
			maxFiles: 30,
			zippedArchive: true,
		}),
		new winstonDaily({
			level: "error",
			datePattern: "YYYY-MM-DD",
			dirname: logDir,
			filename: "%DATE%.log",
			maxFiles: 30,
			zippedArchive: true,
		}),
	],
	exceptionHandlers: [
		//uncaughtException edge case
		new winstonDaily({
			level: "error",
			datePattern: "YYYY-MM-DD",
			dirname: logDir,
			filename: "%DATE%.error.log",
			maxFiles: 30,
			zippedArchive: true,
		}),
	],
});

//Dev Env Setting
if (process.env.NODE_ENV !== "production") {
	logger.add(
		new winston.transports.Console({
			format: winston.format.combine(
				winston.format.colorize(),
				winston.format.simple()
			),
		})
	);
}

export default logger;
