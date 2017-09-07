"use strict";

import "jest";
import { TypeDescriptor } from "../src/metadata/types";

describe("TypeDescriptor", () => {
    it("Should be able to add keys and order them", () => {
        const descr = new TypeDescriptor();

        descr.add("zz");
        descr.add("a");
        descr.add("b");

        expect(descr.toString()).toBe("a,b,zz");
    });

    it("Should fail whe adding a duplicate", () => {
        const descr = new TypeDescriptor();

        descr.add("aa");

        expect(() => {
            descr.add("aa");
         }).toThrowError();
    });

    it("Should match with deserialized object with same keys", () => {
        const serialized = '{"a": 5, "banana":[1,2,3], "orange":{}}';
        const descr = new TypeDescriptor();

        descr.add("a");
        descr.add("banana");
        descr.add("orange");

        const obj = JSON.parse(serialized);
        expect(descr.matches(obj)).toBe(true);
    });
});
