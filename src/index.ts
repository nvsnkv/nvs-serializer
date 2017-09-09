import Serializable from "./metadata/SerializableDecorator";
import TypeRepository from "./repository/TypesRepository";
import Serializer from "./serializer/Serializer";

export const defaultRepository = new TypeRepository();
export { Serializable, Serializer, TypeRepository };
