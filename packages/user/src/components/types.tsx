import React from "react";

export type ButtonProps = {
    children?: React.ReactNode; // 允许 `children` 作为可选属性
    onClick?: () => void;
    type?: string;
};

export type InputProps = {
    placeholder?: string;
    children?: React.ReactNode;
}
