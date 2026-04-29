import { useState } from "react"

function App() {
  const [code, setCode] = useState("")
  const [feedback, setFeedback] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  async function handleReview() {
    setIsLoading(true)
    setFeedback("")

    const response = await fetch("http://127.0.0.1:8000/review", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code })
    })

    const data = await response.json()
    setFeedback(data.feedback)
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      
      <h1 className="text-4xl font-bold text-center text-purple-400 mb-2">
        AI Code Reviewer
      </h1>
      <p className="text-center text-gray-400 mb-8">
        Paste your code and get instant AI feedback
      </p>

      <div className="max-w-3xl mx-auto">
        <textarea
          className="w-full h-64 bg-gray-900 text-green-400 font-mono p-4 rounded-lg border border-gray-700 focus:outline-none focus:border-purple-500"
          placeholder="Paste your code here..."
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button
          onClick={handleReview}
          disabled={isLoading||!code}
          className="mt-4 w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors"
        >
          {isLoading ? "Reviewing..." : "Review Code"}
        </button>

        {feedback && (
          <div className="mt-6 bg-gray-900 border border-gray-700 rounded-lg p-6">
            <h2 className="text-purple-400 font-semibold text-lg mb-3">
              AI Feedback
            </h2>
            <pre className="text-gray-300 whitespace-pre-wrap font-mono text-sm">
              {feedback}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}

export default App