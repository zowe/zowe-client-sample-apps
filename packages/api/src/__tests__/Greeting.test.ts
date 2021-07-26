import { Greeting } from '../Greeting';

describe("Greeting tests", () => {
    it("should return 'Hello'", () => {


        let greeting = new Greeting();

        const test = "hey";

        expect(test).toEqual("hey");
    });
});
