import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { Overlay, ModalWindow } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ children, onClose }) => {
  useEffect(() => {
    const handlKeydown = evt => {
      if (evt.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handlKeydown);
    return () => window.removeEventListener('keydown', handlKeydown, []);
  });

  const clickOnOverlay = evt => {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={clickOnOverlay}>
      <ModalWindow>{children}</ModalWindow>
    </Overlay>,
    modalRoot
  );
};
Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
