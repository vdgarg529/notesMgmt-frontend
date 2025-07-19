// // src/components/SpeechToTextInput.tsx
// // Add this at the top of the file

// // src/components/SpeechToTextInput.tsx

// export {}; // ← ensures module context for global declarations

// declare global {
//   interface Window {
//     webkitSpeechRecognition: any;
//     SpeechRecognition: any;
//   }
// }

// const SpeechRecognition: any = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;


// import React, { useState, useRef, useEffect } from 'react';




// interface SpeechToTextInputProps {
//   onTextChange: (text: string) => void;
//   onStart?: () => void;
//   onStop?: () => void;
//   initialText?: string;
//   placeholder?: string;
//   disabled?: boolean;
// }

// const SpeechToTextInput: React.FC<SpeechToTextInputProps> = ({
//   onTextChange,
//   onStart,
//   onStop,
//   initialText = '',
//   placeholder = 'Speak or type here...',
//   disabled = false
// }) => {
//   const [isListening, setIsListening] = useState(false);
//   const [text, setText] = useState(initialText);
//   const recognitionRef = useRef<any>(null);


//   useEffect(() => {
//     if ('webkitSpeechRecognition' in window) {
//       const SpeechRecognition = window.webkitSpeechRecognition;
//       recognitionRef.current = new SpeechRecognition();
//       recognitionRef.current.continuous = true;
//       recognitionRef.current.interimResults = true;
//       recognitionRef.current.lang = 'en-US';

//       recognitionRef.current.onresult = (event) => {
//         let transcript = '';
//         for (let i = event.resultIndex; i < event.results.length; i++) {
//           if (event.results[i].isFinal) {
//             transcript += event.results[i][0].transcript;
//           }
//         }
//         setText(prev => prev + transcript);
//       };

//       recognitionRef.current.onerror = (event) => {
//         console.error('Speech recognition error', event.error);
//         stopListening();
//       };

//       recognitionRef.current.onend = () => {
//         if (isListening) {
//           startListening();
//         }
//       };
//     } else {
//       console.warn('Web Speech API is not supported in this browser');
//     }

//     return () => {
//       if (recognitionRef.current) {
//         recognitionRef.current.stop();
//       }
//     };
//   }, []);

//   useEffect(() => {
//     onTextChange(text);
//   }, [text, onTextChange]);

//   const startListening = () => {
//     if (recognitionRef.current && !isListening) {
//       recognitionRef.current.start();
//       setIsListening(true);
//       if (onStart) onStart();
//     }
//   };

//   const stopListening = () => {
//     if (recognitionRef.current && isListening) {
//       recognitionRef.current.stop();
//       setIsListening(false);
//       if (onStop) onStop();
//     }
//   };

//   const toggleListening = () => {
//     if (isListening) {
//       stopListening();
//     } else {
//       startListening();
//     }
//   };

//   const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     setText(e.target.value);
//   };

//   return (
//     <div className="w-full">
//       <div className="relative">
//         <textarea
//           value={text}
//           onChange={handleTextChange}
//           placeholder={placeholder}
//           className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[120px]"
//           disabled={disabled}
//         />
//         <button
//           type="button"
//           onClick={toggleListening}
//           disabled={disabled}
//           className={`absolute right-3 bottom-3 p-2 rounded-full ${
//             isListening 
//               ? 'bg-red-500 hover:bg-red-600' 
//               : 'bg-blue-500 hover:bg-blue-600'
//           } text-white`}
//         >
//           {isListening ? (
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1zm4 0a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
//             </svg>
//           ) : (
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
//             </svg>
//           )}
//         </button>
//       </div>
//       {isListening && (
//         <div className="mt-2 text-sm text-blue-600 flex items-center">
//           <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse mr-2"></div>
//           Listening...
//         </div>
//       )}
//     </div>
//   );
// };

// export default SpeechToTextInput;



// src/components/SpeechToTextInput.tsx
export {}; // Ensures module context for global declarations

declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

import React, { useState, useRef, useEffect } from 'react';

interface SpeechToTextInputProps {
  onTextChange: (text: string) => void;
  onStart?: () => void;
  onStop?: () => void;
  initialText?: string;
  placeholder?: string;
  disabled?: boolean;
}

const SpeechToTextInput: React.FC<SpeechToTextInputProps> = ({
  onTextChange,
  onStart,
  onStop,
  initialText = '',
  placeholder = 'Speak or type here...',
  disabled = false
}) => {
  const [isListening, setIsListening] = useState(false);
  const [finalText, setFinalText] = useState(initialText);
  const [interimText, setInterimText] = useState('');
  const recognitionRef = useRef<any>(null);
  const isListeningRef = useRef(isListening);

  // Update ref when state changes
  useEffect(() => {
    isListeningRef.current = isListening;
  }, [isListening]);

  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        let newFinal = '';
        let newInterim = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          const transcript = result[0].transcript;
          
          if (result.isFinal) {
            newFinal += transcript + ' ';
          } else {
            newInterim += transcript;
          }
        }

        if (newFinal) {
          setFinalText(prev => prev + newFinal);
          setInterimText('');
        }
        
        if (newInterim) {
          setInterimText(newInterim);
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        stopListening();
      };

      recognitionRef.current.onend = () => {
        if (isListeningRef.current) {
          recognitionRef.current.start();
        } else {
          setInterimText('');
        }
      };
    } else {
      console.warn('Web Speech API is not supported in this browser');
    }

    return () => {
      stopListening();
    };
  }, []);

  useEffect(() => {
    onTextChange(finalText + interimText);
  }, [finalText, interimText, onTextChange]);

  const startListening = () => {
    if (disabled) return;
    
    if (recognitionRef.current && !isListening) {
      try {
        recognitionRef.current.start();
        setIsListening(true);
        if (onStart) onStart();
      } catch (error) {
        console.error('Speech recognition start error:', error);
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      setInterimText('');
      if (onStop) onStop();
    }
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setFinalText(newText);
    setInterimText('');
    onTextChange(newText);
  };

  const clearText = () => {
    setFinalText('');
    setInterimText('');
    onTextChange('');
  };

  return (
    <div className="w-full">
      <div className="relative">
        <textarea
          value={finalText + interimText}
          onChange={handleTextChange}
          placeholder={placeholder}
          className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[120px]"
          disabled={disabled}
        />
        <div className="absolute right-3 bottom-3 flex gap-2">
          <button
            type="button"
            onClick={clearText}
            disabled={disabled}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700"
            title="Clear text"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </button>
          <button
            type="button"
            onClick={toggleListening}
            disabled={disabled}
            className={`p-2 rounded-full ${
              isListening 
                ? 'bg-red-500 hover:bg-red-600' 
                : 'bg-blue-500 hover:bg-blue-600'
            } text-white`}
            title={isListening ? "Stop listening" : "Start listening"}
          >
            {isListening ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1zm4 0a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        </div>
      </div>
      {isListening && (
        <div className="mt-2 text-sm text-blue-600 flex items-center">
          <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse mr-2"></div>
          Listening... {interimText && <span className="ml-2 text-gray-500">{interimText}</span>}
        </div>
      )}
    </div>
  );
};

export default SpeechToTextInput;