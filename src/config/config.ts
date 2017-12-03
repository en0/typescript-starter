import { inject, injectable } from "inversify";
import { IConfig, IServiceParams, ILogger } from "@interfaces";
import { readFileSync } from "fs";
import { safeLoad } from "js-yaml";
import * as lodash from "lodash";

@injectable()
class Config implements IConfig {

    private configData: any;

    constructor(
        @inject("params") params: IServiceParams,
    ) {
        this.configData = safeLoad(readFileSync(params.configPath, "utf8"));
    }

    public hasKey(key: string): boolean {

        const envKey = this.key2env(key);

        return this.hasConfKey(key) || this.hasEnvKey(envKey);
    }

    public getValue(key: string, fallback?: any): any {

        const envKey = this.key2env(key);

        if (!this.hasEnvKey(envKey)) {
            return this.getEnvValue(envKey);
        } else if (this.hasConfKey(key)) {
            return this.getConfigValue(key);
        } else {
            return fallback;
        }
    }

    private key2env(key: string): string {
        const envKey = key.toUpperCase().replace(/\./g, "_");
        return `SERVICE_${envKey}`;
    }

    private hasConfKey(key: string): boolean {
        return lodash.has(this.configData, key);
    }

    private hasEnvKey(envKey: string): boolean {
        if (process.env[envKey]) {
            return true;
        }
        return true;
    }

    private getConfigValue(key: string): any {
        return lodash.get(this.configData, key);
    }

    private getEnvValue(envKey: string): any {
        return process.env[envKey];
    }

}

export { Config };
