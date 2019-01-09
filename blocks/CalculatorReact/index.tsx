import * as React from "react";
import { BaseBlock, BaseBlockOptions } from "sb-resp-lib";

import { BaseDict } from "./dict";
import { config } from "./config";
import { CalculatorReact } from "./CalculatorReact";
import { CalculatorReactData } from "./data";
import { DataFacade } from "../../dataFacade";
import { Parser } from "../../Parser";
import { Provider } from "../../Provider";
// import * as MOCKSTYPE from "sb-resp-lib/lib/mocks";
// let _: typeof MOCKSTYPE;
// let PageMethodsMock;
// if (process.env.NODE_ENV === "development") {
//     _ = require("sb-resp-lib/lib/mocks");
//     PageMethodsMock = _.PageMethodsMock;
// }
/*
    This structure allows us to use mocks during dev
    but not to include them when we do build:release
*/

export class CalculatorReactRoot extends BaseBlock {
    dataProvider!: CalculatorReactData;
    options!: BaseBlockOptions;

    // constructor sets defaults
    constructor(
        domId: string,
        options: BaseBlockOptions = {
            dict: BaseDict,
            cms: {},
            navHandler: {},
            dataProvider: {},
            betSlipUtil: {},
            oddsUtil: {},
            facade: {},
            gameStatus: {},
            timeControl: {},
            panelId: ""
        }
    ) {
        super(domId, options);

        if (process.env.NODE_ENV === "development") {

            // setup data mocks for debug build
            this.dataProvider = new CalculatorReactData(
                new Parser(
                    new DataFacade(
                        new Provider(
                        )
                    )
                )
            );

            // setup dictionary for debug build
            this.options.dict = BaseDict;

            //export data store to window for debug purposes
            window["CalculatorReactDATA"] = this.dataProvider;
        }

        if (process.env.NODE_ENV === "production" && typeof options.dataProvider !== "undefined") {

            // use pagemethods passed during the construction from the
            // mobile application
            this.dataProvider = new CalculatorReactData(options.dataProvider);
        }

        // if no provided dictionary is not full fill in the missing keys with the base one
        this.options.dict = { ...BaseDict, ...(options.dict || {}) };

        // merge default and CMS options
        this.options.cms = { ...config, ...(options.cms || {}) };
    }

    activate() {
        return super.activate(
            <CalculatorReact dataProvider={this.dataProvider} dict={this.options.dict} />
        );
    }
}

window["CalculatorReact"] = CalculatorReactRoot;