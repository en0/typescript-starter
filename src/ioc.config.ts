import "reflect-metadata";
import { Container } from "inversify";

/*
 * Interfaces
 */

import {
    IGreeter,
    ILogger,
    IConfig,
    IService,
    IServiceParams,
} from "@interfaces";

/*
 * Modules
 */

import { HelloWorld } from "./greeter";
import { Logger } from "./logger";
import { Config } from "./config";

function App<T>(Service: new (...args: any[]) => T, params: IServiceParams): T {

    const ioc = new Container();

    /*
     * Singletons
     */

    ioc.bind<T>("Service").to(Service).inSingletonScope();
    ioc.bind<IConfig>("Config").to(Config).inSingletonScope();
    ioc.bind<ILogger>("Logger").to(Logger).inSingletonScope();

    /*
     * Instance Clases
     */

    ioc.bind<IGreeter>("Greeter").to(HelloWorld);

    /*
     * Constants
     */

    ioc.bind<IServiceParams>("params").toConstantValue(params);

    return ioc.get<T>("Service");
}

export { App };
