import "jest";
import { defaultRepository as repo, Serializable, Serializer } from "../src";

/* tslint:disable */
class Sample {
    public get prop1(): string { return this._prop1; }

    public get prop2(): number {return this._prop2; }

    constructor(prop1: string, prop2: number){
        this._prop1 = prop1;
        this._prop2 = prop2;
    }

    public concat(): string {
        return this._prop1 + this._prop2;
    }

    @Serializable()
    private _prop1: string;

    @Serializable()
    private _prop2: number;
}

/* tslint:enable */
repo.register(Sample);

describe("Serializer", () => {
    it("Should serialize objects correctly", () => {
        const expected = new Sample("prop1", 19);
        const serializer = new Serializer(repo);

        const data = serializer.stringify(expected);
        const actual = serializer.parse<Sample>(data);

        expect(actual).toBeDefined();
        expect(actual).not.toBeNull();

        expect(actual.prop1).toBe(expected.prop1);
        expect(actual.prop2).toBe(expected.prop2);

        expect(actual.concat()).toBe(expected.concat());
    });
});
