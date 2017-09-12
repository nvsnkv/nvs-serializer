import * as _ from "lodash";

export class TypeDescriptor {
    private _fields: string[] = [];

    public get fields(): string[] {
        return _.clone(this._fields);
    }

    public add(key: string): void {
        if (_(this._fields).find((i) => key === i)) {
            throw new Error("Invalid operation: given key has been already added");
        }

        this._fields.push(key);
        this._fields.sort();
    }

    public clone(): TypeDescriptor {
        const result = new TypeDescriptor();
        result._fields = [];
        for (const field of this._fields) {
            result._fields.push(field);
        }

        return result;
    }

    public equalsTo(other: TypeDescriptor): boolean {
        return _(this._fields).isEqual(other._fields);
    }

    public differsFrom(obj: any): number {
        const actualKeys = _(obj).keys().sort().value();
        let i = 0;
        let j = 0;

        while (i < this._fields.length && j < actualKeys.length) {
            if (this._fields[i] !== actualKeys[j]) {
                j++;
            } else {
                j++;
                i++;
            }
        }

        return i === this._fields.length ? actualKeys.length - this._fields.length : +Infinity;
    }

    public toString(): string {
        return this._fields.join(",");
    }
}

export type TypeConstructor = new () => any;
