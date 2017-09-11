import { exec } from 'child_process';
import 'jest';
import { defaultRepository as repo, Serializable, Serializer } from "../src";

/* tslint:disable */
class Sample {
    public get prop1(): string { return this._prop1; }

    public get prop2(): number { return this._prop2; }

    constructor(prop1: string, prop2: number) {
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

class SampleSuccessor extends Sample {

    get prop3(): boolean { return this._prop4; }

    constructor(prop1: string, prop2: number, prop3: boolean) {
        super(prop1, prop2);

        this._prop4 = prop3;
    }

    @Serializable()
    private _prop4: boolean;
}

class ComplexSample {
    @Serializable()
    public strings: string[];

    @Serializable()
    public numbers: number[];

    @Serializable()
    public object: Sample;

    @Serializable()
    public objects: Sample[];

    @Serializable()
    public isNull: Sample;

    public static Create(): ComplexSample {
        const result = new ComplexSample();

        result.isNull = null;
        result.strings = ["apple", "orange", "banana", "dd"];
        result.numbers = [1, 2, 3, 5, 7, 11];

        result.object = new Sample("prop1", 2);

        result.objects = [];
        for (let i = 0; i < 10; i++) {
            result.objects.push(new Sample("po", i));
        }

        return result;
    }
}

/* tslint:enable */
repo.register(Sample);
repo.register(ComplexSample);
repo.register(SampleSuccessor);

describe("Serializer", () => {
    it("Should serialize objects correctly", () => {
        const expected = new Sample("prop1", 19);
        const serializer = new Serializer(repo);

        const data = serializer.stringify(expected);
        const actual = serializer.parse<Sample>(data);

        expect(actual).toBeDefined();
        expect(actual).not.toBeNull();
        expect(actual).toBeInstanceOf(Sample);

        expect(actual.prop1).toBe(expected.prop1);
        expect(actual.prop2).toBe(expected.prop2);

        expect(actual.concat()).toBe(expected.concat());
    });

    it("Should serialize complex objects", () => {
        const expected = ComplexSample.Create();
        const serializer = new Serializer(repo);

        const data = serializer.stringify(expected);
        const actual = serializer.parse<ComplexSample>(data);

        expect(actual).toBeDefined();
        expect(actual).not.toBeNull();

        expect(actual.isNull).toBeNull();

        expect(actual.object).toBeDefined();
        expect(actual.object).not.toBeNull();

        expect(actual.object).toBeInstanceOf(Sample);
        expect(actual.object.prop1).toBe(expected.object.prop1);
        expect(actual.object.prop2).toBe(expected.object.prop2);

        expect(actual.strings).toBeDefined();
        expect(actual.strings).not.toBeNull();

        expect(actual.strings).toHaveLength(expected.strings.length);
        for (let i = 0; i < actual.strings.length; i++) {
            expect(actual.strings[i]).toBe(expected.strings[i]);
        }

        expect(actual.numbers).toBeDefined();
        expect(actual.numbers).not.toBeNull();

        expect(actual.numbers).toHaveLength(expected.numbers.length);
        for (let i = 0; i < actual.strings.length; i++) {
            expect(actual.numbers[i]).toBe(expected.numbers[i]);
        }

        expect(actual.objects).toBeDefined();
        expect(actual.objects).not.toBeNull();

        expect(actual.objects).toHaveLength(expected.objects.length);

        for (let i = 0; i < actual.objects.length; i++) {
            expect(actual.objects[i]).toBeDefined();
            expect(actual.objects[i]).not.toBeNull();
            expect(actual.objects[i]).toBeInstanceOf(Sample);

            expect(actual.objects[i].prop1).toBe(expected.objects[i].prop1);
            expect(actual.objects[i].prop2).toBe(expected.objects[i].prop2);
        }
    });

    it("Should choose deserialization type as close as possible", () => {
        const expected = new ComplexSample();
        expected.object = new SampleSuccessor("common", 1, true);
        const serializer = new Serializer(repo);

        const data = serializer.stringify(expected);
        const actual = serializer.parse<ComplexSample>(data);

        expect(actual).toBeTruthy();
        expect(actual.object).toBeTruthy();
        expect(actual.object).toBeInstanceOf(SampleSuccessor);

        const actualObject = actual.object as SampleSuccessor;
        expect(actualObject.prop3).toBe(true);
    });
});
