"use strict";

import "jest";
import { Serializable, TypeRepository } from "../src";

class Sample {
    public prop: number;
}

// tslint:disable-next-line:max-classes-per-file
class Annotated {
    @Serializable()
    public prop: number;
}

describe("TypesRepository", () => {
    it("Shouldnt be able to add not-annotated type", () => {
        const repo = new TypeRepository();

        expect(() => {
            repo.register(Sample);
        }).toThrowError();
    });

    it ("Should be able to add annotated type", () => {
        const repo = new TypeRepository();

        repo.register(Annotated);
    });

    it ("Should not be able to add annotated type twice", () => {
        const repo = new TypeRepository();

        repo.register(Annotated);
        expect(() => {
            repo.register(Annotated);
        }).toThrowError();
    });

    it ("Should return constructor for previosly registered type", () => {
        const repo = new TypeRepository();

        repo.register(Annotated);

        const data = new Annotated();
        data.prop = 15;

        const serialized = JSON.stringify(data);
        const deserialized = JSON.parse(serialized);

        expect(repo.getCtor(data)).toBe(Annotated);
    });
});
