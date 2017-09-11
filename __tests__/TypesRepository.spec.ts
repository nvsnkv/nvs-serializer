"use strict";

import "jest";
import { Serializable, TypeRepository } from "../src";
// tslint:disable
class Sample {
    public prop: number;
}

class Annotated {
    @Serializable()
    public prop: number;
}

class AnnotatedSuccessor extends Annotated {
    @Serializable()
    public rep: string;
}

// tslint:enable

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

        expect(repo.getConstructor(data)).toBe(Annotated);
    });

    it("Should register both successor and its base class", () => {
        const repo = new TypeRepository();
        repo.register(Annotated);
        expect(() => repo.register(AnnotatedSuccessor)).not.toThrowError();

        const data = JSON.parse('{"prop": 15, "rep": "some text"}');
        expect(repo.getConstructor(data)).toBe(AnnotatedSuccessor);

    });
});
