import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

export function Modal({ onClose, pathImage, tags }) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        onClose();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  function handleCloseBackdrop(e) {
    if (e.currentTarget === e.target) {
      onClose();
    }
  }

  return (
    <div className={css.Overlay} onClick={handleCloseBackdrop}>
      <div className={css.Modal}>
        <img src={pathImage} alt={tags} />
      </div>
    </div>
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  pathImage: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
