import Serializable from "./metadata/SerializableDecorator";
import TypeRepository from "./repository/TypesRepository";

export const repo = new TypeRepository();
export { Serializable, TypeRepository };
