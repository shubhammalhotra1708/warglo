"use client"

import { useState, type ChangeEvent } from "react"
import Image from "next/image"

interface ImageUploadProps {
  onSubmit: (file: File | null) => Promise<void>
}

export default function ImageUpload({ onSubmit }: ImageUploadProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) return

    setIsUploading(true)
    await onSubmit(selectedFile)
    setIsUploading(false)
    setSelectedImage(null)
    setSelectedFile(null)
  }

  return (
    <div className="w-full">
      <div className="mb-4">
        <label htmlFor="image-upload" className="block text-sm font-medium text-gray-700 mb-2">
          Select an image to upload
        </label>
        <input
          type="file"
          id="image-upload"
          accept="image/*"
          onChange={handleImageChange}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-violet-50 file:text-violet-700
            hover:file:bg-violet-100"
        />
      </div>

      {selectedImage && (
        <div className="mt-4">
          <Image
            src={selectedImage || "/placeholder.svg"}
            alt="Selected"
            width={300}
            height={300}
            className="rounded-lg"
          />
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={!selectedImage || isUploading}
        className={`mt-4 px-4 py-2 rounded-md text-white font-medium ${
          !selectedImage || isUploading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {isUploading ? "Uploading..." : "Upload Image"}
      </button>
    </div>
  )
}



