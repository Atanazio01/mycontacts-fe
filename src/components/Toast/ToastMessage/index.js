import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Container } from './styles';

import xCircleIcon from '../../../assets/images/icons/x-circle.svg';
import checkCircleIcon from '../../../assets/images/icons/check-circle.svg';

export default function ToastMessage({ message, onRemoveMessage }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemoveMessage(message.id);
    }, message.duration || 7000);

    return () => clearTimeout(timer);
  }, [message, onRemoveMessage]);

  function handleRemoveToast() {
    onRemoveMessage(message.id); // Replace 'message-id' with the actual message ID if available
  }

  return (
    <Container
      type={message.type}
      onClick={() => handleRemoveToast()}
      tabIndex={0}
      role="button"
    >
      {message.type === 'danger' && <img src={xCircleIcon} alt="X" />}
      {message.type === 'success' && <img src={checkCircleIcon} alt="Check" />}
      <strong>{message.text}</strong>
    </Container>
  );
}

ToastMessage.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['default', 'success', 'danger']),
    duration: PropTypes.number, // Optional, if you want to use it for custom durations
  }).isRequired,
  onRemoveMessage: PropTypes.func.isRequired,
};
