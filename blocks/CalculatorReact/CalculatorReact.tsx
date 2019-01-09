import * as React from "react";
import { observer } from "mobx-react";

// imported only for typings
// these are passed to the component from index.ts
import { BaseDict } from "./dict";
import { CalculatorReactData } from "./data";
import { Button } from "./components";

/*
    Setup testing tools for MobX
    uncoment the <DevTools /> at the end of the CalculatorReact component
*/
// import DevTools from "mobx-react-devtools";
// import { setLogEnabled, setUpdatesEnabled, setGraphEnabled } from "mobx-react-devtools";
// if (process.env.NODE_ENV === "development") {
//     setLogEnabled(true);
//     setUpdatesEnabled(true);
//     setGraphEnabled(true);
// }

@observer
export class CalculatorReact extends React.Component<{
    dataProvider: CalculatorReactData,
    dict: BaseDict,
}, {
    dataProvider: CalculatorReactData,
}> {
    dict: BaseDict

    constructor(props) {
        super(props);
        // setup dictionary
        this.dict = this.props.dict;

        // setup data provider
        this.state = {
            dataProvider: this.props.dataProvider,
        }
    }

    render() {
        return (
            <div className="calculator-wrapper"
                tabIndex={0}>

                <div className="calculator-display">
                    <input className="current-value" onKeyUp={this.state.dataProvider.getKeyCodes}
                        value={this.state.dataProvider.updateResult} />
                </div>

                <div className="buttons-panel">
                    <Button dataBtn="7" value="7" className="key-button" onClick={this.state.dataProvider.handleClick} />
                    <Button dataBtn="8" value="8" className="key-button" onClick={this.state.dataProvider.handleClick} />
                    <Button dataBtn="9" value="9" className="key-button" onClick={this.state.dataProvider.handleClick} />
                    <Button dataAction="multiply" value="X" className="key-button" onClick={this.state.dataProvider.handleClick} />
                    <Button dataBtn="4" value="4" className="key-button" onClick={this.state.dataProvider.handleClick} />
                    <Button dataBtn="5" value="5" className="key-button" onClick={this.state.dataProvider.handleClick} />
                    <Button dataBtn="6" value="6" className="key-button" onClick={this.state.dataProvider.handleClick} />
                    <Button dataAction="divide" value="/" className="key-button" onClick={this.state.dataProvider.handleClick} />
                    <Button dataBtn="1" value="1" className="key-button" onClick={this.state.dataProvider.handleClick} />
                    <Button dataBtn="2" value="2" className="key-button" onClick={this.state.dataProvider.handleClick} />
                    <Button dataBtn="3" value="3" className="key-button" onClick={this.state.dataProvider.handleClick} />
                    <Button dataAction="substract" value="-" className="key-button" onClick={this.state.dataProvider.handleClick} />
                    <Button dataAction="AC" value="AC" className="key-button" onClick={this.state.dataProvider.handleClick} />
                    <Button dataBtn="0" value="0" className="key-button" onClick={this.state.dataProvider.handleClick} />
                    <Button dataBtn="." value="." className="key-button" onClick={this.state.dataProvider.handleClick} />
                    <Button dataAction="add" value="+" className="key-button" onClick={this.state.dataProvider.handleClick} />
                    <Button dataAction="calculate" value="=" className="key-equal" onClick={this.state.dataProvider.handleClick} />
                </div>
            </div>
        )
    }
}