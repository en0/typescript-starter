import { App } from "./ioc.config";
import { IService } from "@interfaces";
import { MyService } from "./service";
import { join } from "path";
import { ArgumentParser } from "argparse";

const ap = new ArgumentParser();
const cp = process.env.SERVICE_CONFIGPATH
    || join(__dirname, "config.yml");

ap.addArgument([ "--config-path" ], {
    defaultValue: cp,
    type: String,
});

const opts = ap.parseArgs();
const app = App<IService>(MyService, {
    configPath: opts.config_path,
});

app.run();
