import { useState, useEffect } from 'react';
import { Container } from './styles';
import ToastMessage from '../ToastMessage';

import { toastEventManager } from '../../../utils/toast';

export default function ToastContainer() {
  const [messages, setMessages] = useState([/*
    { id: Math.random(), type: 'default', text: 'Default text' },
    { id: Math.random(), type: 'danger', text: 'Danger text' },
    { id: Math.random(), type: 'success', text: 'Success text' },
   */]);

  useEffect(() => {
    function handleAddToast({ type, text }) {
      setMessages((prevState) => [
        ...prevState,
        { id: Math.random(), type, text },
      ]);
    }

    toastEventManager.on('addtoast', handleAddToast);

    return () => {
      toastEventManager.removeListener('addtoast', handleAddToast);
    };
  }, []);

  return (
    <Container>
      {messages.map((message) => (
        <ToastMessage
          key={message.id}
          type={message.type}
          text={message.text}
        />
      ))}
    </Container>
  );
}
