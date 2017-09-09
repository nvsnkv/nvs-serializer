import * as _ from "lodash";
import TypeRepository from "../repository/TypesRepository";

export default class Serializer {
    private repo: TypeRepository;

    constructor(repo: TypeRepository) {
        if (!repo) {
            throw new Error("Unable to create serializer - no types repository given!");
        }

        this.repo = repo;
    }
    public stringify(obj: any): string {
        return JSON.stringify(obj);
    }

    public parse<T>(json: string): T {
        const data = JSON.parse(json);

        return this.restoreType(data) as T;
    }

    private restoreType(data: any): any {
        if (data instanceof Array) {
            const resultArray = [];
            _(data).forEach((d) => {
                resultArray.push(this.restoreType(d));
            });

            return resultArray;
        }

        const ctor = this.repo.getConstructor(data);
        if (!ctor) {
            return data;
        }
        const result = new ctor();

        _(data).keys().forEach((key) => {
            result[key] = this.restoreType(data[key]);
        });

        return result;
    }
}
