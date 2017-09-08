import { defaultOptions, SerializationOptions } from "./SerializationOptions";
import { TypeDescriptor } from "./TypeDescriptor";

export default function Serializable(options?: SerializationOptions): PropertyDecorator {
    options = { ...defaultOptions, ...options };
    return (target: object, name: string) => {
        if (!target.constructor.prototype[options.metadataPropertyName]) {
            target.constructor.prototype[options.metadataPropertyName] = new TypeDescriptor();
        }

        const descriptor = target.constructor.prototype[options.metadataPropertyName] as TypeDescriptor;
        descriptor.add(name);
    };
}
