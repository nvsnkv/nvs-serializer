import TypeDescriptor from "./TypeDescriptor";

export default class TypeRepository {
    public register(ctor: new (...args: any[]) => any): void {
        const sample = new ctor();
        if (!sample.__serializationData) {
            throw new Error("Unable to register a type: no serailization data found!");
        }
    }
}
