"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import ImageUpload from "@/components/ImageUpload"
import UserDetailsModal from "@/components/UserDetailsModal"

export default function Home() {
  const router = useRouter()
  const [userDetails, setUserDetails] = useState({
    skinTone: "",
    hairColor: "",
    height: "",
    waist: "",
  })
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleUserDetailsChange = (details: typeof userDetails) => {
    setUserDetails(details)
  }

  const handleSubmit = async (imageFile: File | null) => {
    if (!imageFile) {
      alert("Please select an image first")
      return
    }

    // Convert image to base64
    const base64Image = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(imageFile)
    })

    // Prepare API request body
    const requestBody = {
      key1: base64Image,
    }
    console.log('image', requestBody)

    try {
      // Call your API endpoint
      const response = await fetch("/api/proxy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      })
      // const response = await fetch("https://rz1lbvvji6.execute-api.us-east-1.amazonaws.com/default/generateFitsFromImage", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(requestBody),
      // })
      console.log(response)
      if (!response.ok) {
        throw new Error("API request failed")
      }

      const data = await response.json()

      // Store the response image URLs in localStorage
      localStorage.setItem("apiResults", JSON.stringify(data.response))

      // Navigate to results page
      router.push("/results")
    } catch (error) {
      console.error("API Error:", error)
      alert("Error processing image")
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Image Upload for ML Processing</h1>
      <div className="w-full max-w-md flex flex-row items-center gap-4">
        <ImageUpload onSubmit={handleSubmit} />
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
        >
          Add Optional Details
        </button>
      </div>
      <UserDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onChange={handleUserDetailsChange}
        details={userDetails}
      />
    </main>
  )
}