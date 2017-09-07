import { defaultOptions, SerializationOptions } from "../metadata/SerializationInfo";

export default class TypeRepository {
    private options: SerializationOptions;
    constructor(options?: SerializationOptions) {
        this.options = { ...defaultOptions, ...options };
    }

    public register(ctor: new (...args: any[]) => any): void {
        const sample = new ctor();
        if (!sample[this.options.metadataPropertyName]) {
            throw new Error("Unable to register a type: no serailization data found!");
        }
    }
}
