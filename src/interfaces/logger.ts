import { LogFn } from "pino";

interface ILogger {
    debug: LogFn;
    info: LogFn;
    warn: LogFn;
    fatal: LogFn;
}

export { ILogger };
