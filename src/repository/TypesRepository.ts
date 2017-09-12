import * as _ from "lodash";
import { defaultOptions, SerializationOptions } from "../metadata/SerializationOptions";
import { TypeConstructor, TypeDescriptor } from "../metadata/TypeDescriptor";

interface ITypeInfo {
    descriptor: TypeDescriptor;
    ctor: TypeConstructor;
}

export default class TypeRepository {
    private options: SerializationOptions;
    private types: ITypeInfo[] = [];

    constructor(options?: SerializationOptions) {
        this.options = { ...defaultOptions, ...options };
    }

    public getConstructor(jsonData: any): TypeConstructor {
        let min = +Infinity;
        let bestMatch: ITypeInfo = null;
        for (const info of this.types) {
            const diff = info.descriptor.differsFrom(jsonData);

            if (diff === 0) {
                return info.ctor;
            }

            if (diff < min) {
                min = diff;
                bestMatch = info;
            }
        }

        return bestMatch ? bestMatch.ctor : null;
    }

    public register(ctor: new (...args: any[]) => any): void {
        const sample = new ctor();
        if (!sample[this.options.metadataPropertyName]) {
            throw new Error("Unable to register a type: no serailization data found!");
        }

        const descriptor = sample[this.options.metadataPropertyName] as TypeDescriptor;
        const existing = _(this.types).find((i) => i.descriptor.equalsTo(descriptor));
        if (existing) {
            throw new Error("Unable to register a type: type was already registered!");
        }

        this.types.push({
            ctor,
            descriptor,
        });
    }
}
