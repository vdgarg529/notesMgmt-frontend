export const sendTranscript = async (text) => {
  try {
    // For Docker: use 'http://server:8000' 
    // For local dev: use 'http://localhost:8000'
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? 'http://server:8000' 
      : 'http://localhost:8000'
    
    const response = await fetch(`${baseUrl}/speech-to-text`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error sending transcript:', error)
    throw error
  }
}