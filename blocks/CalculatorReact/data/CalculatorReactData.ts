import { observable, action, observe, computed } from "mobx";
import { Parser } from "../../../Parser";
//import { BtnsMock } from "../../../mocks";
/*
    Tests describing the structure of the ouput data should be written first.
    It would be better to split the tests into few suits:
    - base tests related to class and instance structure
    - business logic
    - edge cases
*/

export class CalculatorReactData {
    @observable provider: Parser;
    @observable result: number;
    @observable currentOperator: string;
    @observable firstValue: number;
    @observable operator: string;

    constructor(provider: Parser) {
        this.provider = provider;
        this.result = provider.result;
        this.operator = provider.operator;
        this.firstValue = provider.firstValue;
        this.currentOperator = provider.currentOperator;
        observe(provider, this.updateData);
    }

    @action.bound updateData(changedObj) {
        this.result = changedObj.result;
        this.currentOperator = changedObj.currentOperator;
        this.firstValue = changedObj.firstValue;
        this.operator = changedObj.operator;
    }

    @action.bound handleClick(e: React.MouseEvent<HTMLButtonElement>) {
        this.provider.handleClick(e);
    }

    @action.bound getKeyCodes(e: React.KeyboardEvent<HTMLElement>) {
        this.provider.getKeyCodes(e);
    }

    @computed get updateResult() {
       return this.provider.result
    }
}