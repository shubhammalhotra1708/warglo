"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function ResultsPage() {
  const router = useRouter()
  const [results, setResults] = useState<{ image_url: string }[]>([])

  useEffect(() => {
    // Retrieve stored results from localStorage
    const storedResults = localStorage.getItem("apiResults")
    console.log(storedResults)
    if (!storedResults) {
      router.push("/")
      return
    }
    setResults(JSON.parse(storedResults))
  }, [router])

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">Processing Results</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {results.map((result, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4">
            <img
              src={result.image_url}
              alt={`Result ${index + 1}`}
              className="w-full h-64 object-contain mb-4"
            />
            <p className="text-center text-gray-600">Result {index + 1}</p>
          </div>
        ))}
      </div>
    </div>
  )
}