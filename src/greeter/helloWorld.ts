import { injectable } from "inversify";
import { IGreeter } from "@interfaces";

@injectable()
class HelloWorld implements IGreeter {

    public get prefix(): string {
        return "Hello";
    }

    public greet(name: string): string {
        return `${this.prefix}, ${name}!`;
    }

}

export { HelloWorld };
