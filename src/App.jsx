import SpeechToText from './components/SpeechToText'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Speech to Text Converter</h1>
        <p className="text-gray-600">Real-time browser speech recognition</p>
      </div>
      <SpeechToText />
    </div>
  )
}

export default App