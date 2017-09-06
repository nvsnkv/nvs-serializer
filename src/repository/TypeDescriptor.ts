export type Ctor = new (...args: any[]) => any;

export default class TypeDescriptor {
    public descriptor: string;
    public ctor: Ctor;
}