import schedule, { Job } from "node-schedule";
import logger from "../config/logger";

export enum EIntervalCrons {
	HOURLY = "0 * * * *",
	FOURHOUR = "0 */4 * * *",
	DAILY = "0 0 * * *",
}

export enum EScheduleTypes {
	HOURLY = "HOURLY",
	FOURHOUR = "FOURHOUR",
	DAILY = "DAILY",
}

interface IScheduleInput {
	scheduleType: EScheduleTypes;
	interval: EIntervalCrons;
	callback: <T = unknown>(args?: T) => Promise<void>;
	taskDescription: string;
}

let jobList: Job[];

export function scheduler(scheduleInput: IScheduleInput): void {
	const { scheduleType, interval, callback, taskDescription } = scheduleInput;

	try {
		findDuplicateAndRemove(scheduleType);
		const job = schedule.scheduleJob(scheduleType, interval, callback);
		jobList.push(job);

		logger.info(
			`Current Scheduled Jobs are as follows: ${jobList}; NEW TASK: ${taskDescription} will be called ${interval} basis`
		);
	} catch (err) {
		logger.error(err.message);
	}
}

function findDuplicateAndRemove(scheduleType: EScheduleTypes) {
	const oldJob = jobList.find((job) => job.name === scheduleType);
	if (oldJob) oldJob.cancel();
}
