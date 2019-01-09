import { DataFacade } from "../dataFacade";
import { observable, action, observe } from "mobx";

export class Parser {
    @observable dataFacade: DataFacade;
    @observable firstValue: number;
    @observable secondValue: number;
    @observable operator: string
    @observable result: number;
    @observable currentOperator: string;

    constructor(dataFacade: DataFacade) {
        this.dataFacade = dataFacade
        this.result = 0;
        this.firstValue = 0;
        this.secondValue = 0;
        this.operator = ""
        this.currentOperator = "";
        observe(dataFacade, this.updateData);
    }

    @action.bound updateData(changedObj) {
        this.result = changedObj.result;
        this.firstValue = changedObj.firstValue;
        this.secondValue = changedObj.secondValue;
        this.currentOperator = changedObj.currentOperator;
        this.operator = changedObj.operator;
    }

    @action.bound getKeyCodes(e: React.KeyboardEvent<HTMLElement>) {
        const buttons = [49, 50, 51, 52, 53, 54, 55, 56, 57, 48];
        const operators = [106, 107, 109, 111, 13];

        for (let i = 0; i < buttons.length; i++) {
            if (e.keyCode === buttons[i]) {
                this.updateInputValue(parseFloat(e.key))
            }
        }

        for (let char = 0; char < operators.length; char++) {
            if (e.keyCode === operators[char]) {

            }
        }
    }

    updateInputValue(newValue: number) {

        if (this.result === 0 || this.currentOperator === "operator" || this.currentOperator === "calculate") {
            this.result = newValue;
        }
        else {
            this.result = parseFloat(`${this.result}${newValue}`)
        }
        this.currentOperator = "number"
    }

    @action.bound setResult(x: React.SyntheticEvent<HTMLElement>) {
        const key = x.currentTarget;
        const btn = key.getAttribute("data-btn");
        const action = key.getAttribute("data-action");

        if (btn) {
            return this.updateInputValue(parseFloat(btn));
        }
        if (action) {

            if (action !== "calculate") {
                this.currentOperator = "operator";
                this.firstValue = this.result;
                this.operator = action;
            }

            if (action === "AC") {
                this.firstValue = 0;
                this.operator = "";
                this.currentOperator = "";
                this.result = 0;
            }

            if (action === "calculate") {
                let currentValue = this.result;
                this.secondValue = currentValue;
                this.result = this.dataFacade.calculate(this.firstValue, this.operator, this.secondValue);
                this.currentOperator = "calculate";
            }
        }

    }

    @action.bound handleClick(x: React.MouseEvent<HTMLButtonElement>) {
        this.setResult(x);
    }
}