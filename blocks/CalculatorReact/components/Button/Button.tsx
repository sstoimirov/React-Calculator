import * as React from "react";

type BtnProps = {
    className?: string;
    dataBtn?: string,
    dataAction?: string,
    value: string,
    onClick: React.MouseEventHandler<HTMLButtonElement>

};

export class Button extends React.Component<BtnProps,
    {}> {
    createButton() {
        const { dataBtn, dataAction, className, value, onClick } = this.props;
        return <button data-btn={dataBtn} data-action={dataAction} className={className} onClick={onClick}>{value}</button>
    }

    render() {
        return (
            <>{this.createButton()}</>
        )
    }
}