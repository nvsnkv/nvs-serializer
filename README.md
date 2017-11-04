nvs-serializer - yet another serializer for typescript.
Allows to restore an instance of class with methods, props...
sample:

import { Serializable, Serializer, TypeRepository } from 'nvs-serializer';

class Point {

    @Serializable()
    public x: number;

    @Serializable()
    public y: number;

    public toString(): string {
        return `(${this.x}, ${this.y})`;
    }
};

const repo = new TypeRepository();

repo.register(Point);

const serializer = new Serializer(repo);

const serializer = new Serializer(repo);

const expected = new Point();
expected.x = 5;
expected.y = 6;

const data = serializer.stringify(expected);
const actual = serializer.parse<Point>(data);

actual.toString(); // returns (5, 6)

Thanks to Hagai Cohen (aka DxCx) for boilerplate!