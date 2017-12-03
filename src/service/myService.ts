import { inject, injectable } from "inversify";
import { IGreeter, ILogger, IService, IConfig } from "@interfaces";

@injectable()
class MyService implements IService {

    public get name(): string {
        return "MyService";
    }

    constructor(
        @inject("Config") private config: IConfig,
        @inject("Logger") private log: ILogger,
        @inject("Greeter") private greeter: IGreeter,
    ) { }

    public run() {
        const name = this.config.getValue("name", "world") as string;
        this.log.info(this.greeter.greet(name));
    }
}

export { MyService };
