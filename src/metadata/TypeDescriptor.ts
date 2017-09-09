import * as _ from "lodash";

export class TypeDescriptor {
    private fields: string[] = [];

    public add(key: string): void {
        if (_(this.fields).find((i) => key === i)) {
            throw new Error("Invalid operation: given key has been already added");
        }

        this.fields.push(key);
        this.fields.sort();
    }

    public equalsTo(other: TypeDescriptor): boolean {
        return _(this.fields).isEqual(other.fields);
    }

    public matches(obj: any): boolean {
        const actualKeys = _(obj).keys().sort().value();
        let i = 0;
        let j = 0;

        while (i < this.fields.length && j < actualKeys.length) {
            if (this.fields[j] !== actualKeys[i]) {
                j++;
            } else {
                j++;
                i++;
            }
        }

        return i === this.fields.length;
    }

    public toString(): string {
        return this.fields.join(",");
    }
}

export type TypeConstructor = new () => any;
