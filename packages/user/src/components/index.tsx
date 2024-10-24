import React from 'react';
import {ButtonProps, InputProps} from "./types";


export const Button: React.FC<ButtonProps> = ({children, type, onClick}) => {
    return (
        <div className="com-btn">
            <button
                onClick={onClick}
                type="button"
                className={ `ant-btn ant-btn-solid ${type}` }>
                <span>{children}</span>
            </button>
        </div>
    )
};

export const Input: React.FC<InputProps> = ({placeholder, children}) => {
    return (
        <div className="com-input">
            {children}
            <input type="text" placeholder={placeholder}/>
        </div>
    )
}
