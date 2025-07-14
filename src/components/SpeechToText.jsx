import { useState, useEffect, useRef } from 'react'
import { sendTranscript } from '../api'

export default function SpeechToText() {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [error, setError] = useState(null)
  const [isSending, setIsSending] = useState(false)
  const finalTranscriptRef = useRef('')

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    
    if (!SpeechRecognition) {
      setError('Browser does not support Speech Recognition')
      return
    }

    const recognition = new SpeechRecognition()
    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = 'en-US'

    recognition.onresult = (event) => {
      let interimTranscript = ''
      let finalTranscript = finalTranscriptRef.current

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript
        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' '
        } else {
          interimTranscript += transcript
        }
      }

      // Update the ref with the latest final transcript
      finalTranscriptRef.current = finalTranscript
      
      // Display final + interim results
      setTranscript(finalTranscript + interimTranscript)
    }

    recognition.onerror = (event) => {
      setError(`Speech recognition error: ${event.error}`)
      stopListening()
    }

    if (isListening) {
      recognition.start()
    } else {
      recognition.stop()
    }

    return () => {
      recognition.stop()
    }
  }, [isListening])

  const startListening = () => {
    setError(null)
    setTranscript('')
    finalTranscriptRef.current = '' // Reset the final transcript ref
    setIsListening(true)
  }

  const stopListening = () => {
    setIsListening(false)
  }

  const handleSendTranscript = async () => {
    if (!transcript.trim()) return
    
    try {
      setIsSending(true)
      const result = await sendTranscript(transcript)
      alert(`Server response: ${result.message}`)
      setTranscript('')
      finalTranscriptRef.current = '' // Reset after sending
    } catch (error) {
      alert('Failed to send transcript to server')
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <div className="flex gap-4 mb-4">
        <button
          onClick={startListening}
          disabled={isListening}
          className={`px-4 py-2 rounded-lg ${isListening 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-green-500 hover:bg-green-600 text-white'}`}
        >
          Start Listening
        </button>
        <button
          onClick={stopListening}
          disabled={!isListening}
          className={`px-4 py-2 rounded-lg ${!isListening 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-red-500 hover:bg-red-600 text-white'}`}
        >
          Stop Listening
        </button>
      </div>
      
      {error && <div className="text-red-500 mb-4">{error}</div>}
      
      <div className="mb-4 p-4 border rounded-lg min-h-[100px]">
        {transcript || <span className="text-gray-400">Transcript will appear here...</span>}
      </div>
      <button
        onClick={handleSendTranscript}
        disabled={!transcript || isSending}
        className={`px-4 py-2 rounded-lg ${
          !transcript || isSending
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600 text-white'
        }`}
      >
        {isSending ? 'Sending...' : 'Send to Server'}
      </button>
    </div>
  )
}