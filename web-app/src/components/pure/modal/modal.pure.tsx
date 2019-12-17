import React from 'react';
import { ModalProps } from '../../../types';
import './modal.pure.css';

export const Modal: React.FC<React.PropsWithChildren<ModalProps>> = ({show = true, children, buttonTitle = "OK Boomer", onClick}) => {

  return (
    <div className={`modal ${show ? "" : "modal_hide"}`}>
      <div className="modal__content">
        {children}
      </div>
      <div className="modal__controls">
        <button onClick={onClick} className="modal__button">
          {buttonTitle}
        </button>
      </div>
    </div>
  )
}