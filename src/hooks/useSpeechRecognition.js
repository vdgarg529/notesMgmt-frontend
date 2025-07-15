// hooks/useSpeechRecognition.js
import { useCallback } from 'react';

function useSpeechRecognition(onResult) {
  const startListening = useCallback(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition not supported');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onresult = event => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
    };

    recognition.onerror = () => alert('Speech recognition error');
    recognition.start();
  }, [onResult]);

  return { startListening };
}

export default useSpeechRecognition;
