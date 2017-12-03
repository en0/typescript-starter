import "reflect-metadata";
import { HelloWorld } from "./helloWorld";
import { Container } from "inversify";
import { IGreeter } from "@interfaces";

let ioc;

describe("greeter/helloWorld", () => {

    beforeAll(function() {
        ioc = new Container();
        ioc.bind<IGreeter>("tg").to(HelloWorld);
    });

    it('should say hello, world when my name is world', function() {
        const tg = ioc.get<IGreeter>("tg");
        expect(tg.greet("world")).toBe("Hello, world!");
    });
});
