import React from 'react';
import ReactDOM from 'react-dom';

type TypeIconKeys = 'info' | 'success' | 'warning' | 'error';
const typeIcon: Record<TypeIconKeys, string> = {
  info: 'sense-icon-status__primary',
  success: 'sense-icon-status__success',
  warning: 'https://commonresource-1252524126.cdn.xiaoeknow.com/image/l97yf8ss00nq.png',
  error: 'sense-icon-status__error',
}

interface IMessageBoxProps {
  type?: string;
  message: string;
  visible?: boolean;
  children?: React.ReactNode;
}

export const MessageBox = (props: IMessageBoxProps): JSX.Element => {
  const { message, type= 'warning', children, visible } = props;
  if (!visible) {
    // @ts-ignore
    return '';
  }
  return ReactDOM.createPortal(
    <div
      role="dialog"
      className="ss-message-box-wrapper ss-message-box-wrapper__info"
    >
      <div className="dialog-mask"></div>
      <div className="ss-message-box">
        <div className="sense-icon-close ss-message-close"></div>
        <div className="ss-message-box-main">
          <div className="ss-message-box-content">
            <div className="ss-message-box-icon">
              <img src={typeIcon[type as TypeIconKeys]}/>
            </div>
            <div className="content__message">{message}</div>
          </div>
        </div>
        <div className="ss-message-box__btn ss-button__right">
          { children }
        </div>
      </div>
    </div>,
    document.body
  );
};
