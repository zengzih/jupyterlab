import ReactDOM from "react-dom";
import React from "react";
import { Button } from './index'

interface IDialogProps {
    title?: string;
    visible?: boolean;
    children?: React.ReactNode;
}
export const Dialog = (props: IDialogProps): JSX.Element => {
    const { title, children, visible } = props;
    if (!visible) {
        // @ts-ignore
        return '';
    }
    return ReactDOM.createPortal(
        <div
            role="dialog"
            className="ss-dialog-wrapper"
        >
            <div className='ss-dialog-wrapper__mask'></div>
            <div className='ss-dialog'>
                <div className="ss-dialog__header">
                    <span className="ss-dialog__header-text">{title}</span>
                    <span className={`ss-dialog__header-icon ss-dialog__header-icon}`}>
                        <img src="https://commonresource-1252524126.cdn.xiaoeknow.com/image/m25y4z7a05m8.png" alt=""/>
                    </span>
                </div>
                <div className="ss-dialog__content">
                    {children}
                </div>
                <div className="ss-dialog__footer">
                    <Button>取消</Button>
                    <Button type='primary'>确定</Button>
                </div>
            </div>
        </div>,
        document.body
    );
};
