import { inject, injectable } from "inversify";
import { IConfig, ILogger } from "@interfaces";
import * as Pino from "pino";

@injectable()
class Logger implements ILogger {

    public debug: Pino.LogFn;
    public info: Pino.LogFn;
    public warn: Pino.LogFn;
    public fatal: Pino.LogFn;

    public constructor(@inject("Config") config: IConfig) {

        const pretty = Pino.pretty();
        pretty.pipe(process.stdout);

        const pino = Pino({
            level: config.getValue("logLevel", "info") as string,
            name: "app",
            safe: true,
        }, pretty);

        this.debug = pino.debug.bind(pino);
        this.info = pino.info.bind(pino);
        this.warn = pino.warn.bind(pino);
        this.fatal = pino.fatal.bind(pino);
    }
}

export { Logger };
