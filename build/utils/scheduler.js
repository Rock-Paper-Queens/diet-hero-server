"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduler = exports.EScheduleTypes = exports.EIntervalCrons = void 0;
const node_schedule_1 = __importDefault(require("node-schedule"));
const logger_1 = __importDefault(require("../config/logger"));
var EIntervalCrons;
(function (EIntervalCrons) {
    EIntervalCrons["HOURLY"] = "0 * * * *";
    EIntervalCrons["FOURHOUR"] = "0 */4 * * *";
    EIntervalCrons["DAILY"] = "0 0 * * *";
})(EIntervalCrons = exports.EIntervalCrons || (exports.EIntervalCrons = {}));
var EScheduleTypes;
(function (EScheduleTypes) {
    EScheduleTypes["HOURLY"] = "HOURLY";
    EScheduleTypes["FOURHOUR"] = "FOURHOUR";
    EScheduleTypes["DAILY"] = "DAILY";
})(EScheduleTypes = exports.EScheduleTypes || (exports.EScheduleTypes = {}));
let jobList;
function scheduler(scheduleInput) {
    const { scheduleType, interval, callback, taskDescription } = scheduleInput;
    try {
        findDuplicateAndRemove(scheduleType);
        const job = node_schedule_1.default.scheduleJob(scheduleType, interval, callback);
        jobList.push(job);
        logger_1.default.info(`Current Scheduled Jobs are as follows: ${jobList}; NEW TASK: ${taskDescription} will be called ${interval} basis`);
    }
    catch (err) {
        logger_1.default.error(err.message);
    }
}
exports.scheduler = scheduler;
function findDuplicateAndRemove(scheduleType) {
    const oldJob = jobList.find((job) => job.name === scheduleType);
    if (oldJob)
        oldJob.cancel();
}
