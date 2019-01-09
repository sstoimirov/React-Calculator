import { Provider } from "../Provider";
import { observable, action } from "mobx";

export class DataFacade {
    @observable provider: Provider;
    @observable result: number;

    constructor(provider: Provider) {
        this.provider = provider
        this.result = 0;
    }
    @action updateResult(val: number) {
        return this.result = val;
    }

    calculate(value1, operator, value2) {
        let result = this.provider.calculate(value1,value2, operator);
        return this.updateResult(result);
    }
}