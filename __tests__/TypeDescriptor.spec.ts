"use strict";

import "jest";
import { TypeDescriptor } from "../src/metadata/TypeDescriptor";

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
        expect(descr.differsFrom(obj)).toBe(0);
    });

    it("Should not match with deserialized object without several keys", () => {
        const serialized = '{"a": 5, "orange":{}}';
        const descr = new TypeDescriptor();

        descr.add("a");
        descr.add("banana");
        descr.add("orange");

        const obj = JSON.parse(serialized);
        expect(descr.differsFrom(obj)).toBe(+Infinity);
    });

    it("Should match with deserialized object with extra keys", () => {
        const serialized = '{"a": 5, "banana":[1,2,3], "exxtra": "large", "orange":{}}';
        const descr = new TypeDescriptor();

        descr.add("a");
        descr.add("banana");
        descr.add("orange");

        const obj = JSON.parse(serialized);
        expect(descr.differsFrom(obj)).toBe(1);
    });

    it("Should be equal with himself", () => {
        const a = new TypeDescriptor();

        a.add("a");
        a.add("banana");
        a.add("orange");

        expect(a.equalsTo(a)).toBe(true);

        const b = new TypeDescriptor();
        b.add("a");
        b.add("orange");
        b.add("banana");

        expect(a.equalsTo(b)).toBe(true);
    });

    it("Should not be equal with descriptor for different type", () => {
        const a = new TypeDescriptor();

        a.add("a");
        a.add("banana");
        a.add("orange");

        const b = new TypeDescriptor();
        b.add("a");
        b.add("exxtra");
        b.add("banana");

        expect(a.equalsTo(b)).toBe(false);
    });
});
