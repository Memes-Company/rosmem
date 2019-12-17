import React, { useState } from 'react';
import { ClassName } from '../../types';
import { useClassName } from '../../hooks';
import { Modal } from '../../components';
import './body.container.css';

export const Body: React.FC<ClassName<{}>> = ({className}) => {
  const parentClassName = useClassName(className);
  const [isModalActive, setIsModalActive] = useState(true);

  const onModalClick = (event: React.MouseEvent) => {
    setIsModalActive(false);
  }

  return (
    <div className={"body" + parentClassName}>
      <div className="body__modal">
        <div className="body__modal-top">
          <Modal show={isModalActive} onClick={onModalClick}>
            <p>Hello there! Here you can find any meme you want, just start typing in the field abouve.</p>
            <p>Or first you can get some additional info about in the footer below (* ^ ω ^).</p>
          </Modal>
        </div>
        <div className="body__modal-center">
          Here is nothing yet...
        </div>
        <div className="body__modal-bottom">
          {/* Just for centering div above */}
        </div>
      </div>
    </div>
  )
}