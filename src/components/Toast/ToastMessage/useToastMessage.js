import { useEffect } from 'react';

export default function useToastMessage(message, onRemoveMessage) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemoveMessage(message.id);
    }, message.duration || 3000);

    return () => clearTimeout(timer);
  }, [message, onRemoveMessage]);

  function handleRemoveToast() {
    onRemoveMessage(message.id); // Replace 'message-id' with the actual message ID if available
  }

  return { handleRemoveToast };
}
