export class Provider {

    calculate(value1: number, value2: number, operator: string) {
        const result = (operator: string) => ({
            add: value1 + value2,
            substract: value1 - value2,
            multiply: value1 * value2,
            divide: value1 / value2
        })[operator];

        return result(operator)
    }
}