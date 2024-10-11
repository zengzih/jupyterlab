import React from 'react';

interface IMessageBoxProps {
    type?: string;
    title?: string;
    message: string;
    children?: React.ReactNode;
}
export const MessageBox = (props: IMessageBoxProps): JSX.Element => {
    const { title, message } = props;
  return (
    <div
      role="dialog"
      className="ss-message-box-wrapper ss-message-box-wrapper__info"
    >
      <div className='dialog-mask'></div>
      <div className="ss-message-box">
        <div className="sense-icon-close ss-message-close"></div>
        <div className="ss-message-box-main">
          <div className="ss-message-box-icon">
            <i className="sense-icon-status__primary"></i>
          </div>
          <div className="ss-message-box-content">
            <div className="content__title">{ title }</div>
            <div className="content__message">
              <div>{ message }</div>
            </div>
          </div>
        </div>
        <div className="ss-message-box__btn ss-button__right">
          <button
            type="button"
            className="ss-button ss-button__primary ss-button__medium"
          ></button>
        </div>
      </div>
    </div>
  );
};
