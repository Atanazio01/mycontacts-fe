import PropTypes from 'prop-types';

import { useEffect, useRef, useState } from 'react';
import { Overlay, Container, Footer } from './styles';

import Button from '../Button';
import ReactPortal from '../ReactPortal';

export default function Modal({
  danger,
  visible,
  isLoading,
  title,
  children,
  cancelLabel,
  confirmLabel,
  onCancel,
  onConfirm,
}) {
  const [shouldRender, setShouldRender] = useState(visible);

  const overlayRef = useRef(null);

  useEffect(() => {
    if (visible) {
      setShouldRender(true);
    }

    function handleAnimationEnd() {
      setShouldRender(false);
    }

    const overlayRefElement = overlayRef.current;

    if (!visible && overlayRefElement) {
      overlayRefElement.addEventListener('animationend', () => {
        setShouldRender(false);
      }, { once: true });
    }

    return () => {
      if (overlayRefElement) {
        overlayRefElement.removeEventListener('animationend', handleAnimationEnd);
      }
    };
  }, [visible]);

  if (!shouldRender) {
    return null;
  }

  return (
    <ReactPortal containerId="modal-root">
      <Overlay isLeaving={!visible} ref={overlayRef}>
        <Container danger={danger} isLeaving={!visible}>
          <h1>{title}</h1>
          <div className="modal-body">{children}</div>
          <Footer>
            <button
              disabled={isLoading}
              onClick={onCancel}
              type="button"
              className="cancel-button"
            >
              {cancelLabel}
            </button>
            <Button
              onClick={onConfirm}
              type="button"
              danger={danger}
              isLoading={isLoading}
            >
              {confirmLabel}
            </Button>
          </Footer>
        </Container>
      </Overlay>
    </ReactPortal>
  );
}

Modal.propTypes = {
  danger: PropTypes.bool,
  visible: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  cancelLabel: PropTypes.string,
  confirmLabel: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

Modal.defaultProps = {
  danger: false,
  isLoading: false,
  cancelLabel: 'Cancelar',
  confirmLabel: 'Confirmar',
};
