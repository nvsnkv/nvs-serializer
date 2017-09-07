"use strict";

import "jest";
import { TypeRepository } from "../src";

describe("TypesRepository", () => {
    it("Shouldnt be able to add a type without @serializable", () => {
        const repo = new TypeRepository();

        class Sample {
            public prop: number;
        }

        expect(() => {
            repo.register(Sample);
        }).toThrowError();
    });
});
