"use client"

import { useState, useEffect, type ChangeEvent } from "react"

interface UserDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  onChange: (details: {
    skinTone: string
    hairColor: string
    height: string
    waist: string
  }) => void
  details: {
    skinTone: string
    hairColor: string
    height: string
    waist: string
  }
}

export default function UserDetailsModal({ isOpen, onClose, onChange, details }: UserDetailsModalProps) {
  const [localDetails, setLocalDetails] = useState(details)

  useEffect(() => {
    setLocalDetails(details)
  }, [details])

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    const newDetails = { ...localDetails, [name]: value }
    setLocalDetails(newDetails)
    onChange(newDetails)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl text-black font-medium mb-4">Additional Details</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="skinTone" className="block text-sm font-medium text-black mb-1">
              Skin Tone
            </label>
            <select
              id="skinTone"
              name="skinTone"
              value={localDetails.skinTone}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="">Select</option>
              <option value="fair">Fair</option>
              <option value="light">Light</option>
              <option value="medium">Medium</option>
              <option value="olive">Olive</option>
              <option value="brown">Brown</option>
              <option value="dark">Dark</option>
            </select>
          </div>
          <div>
            <label htmlFor="hairColor" className="block text-sm font-medium text-black mb-1">
              Hair Color
            </label>
            <input
              type="text"
              id="hairColor"
              name="hairColor"
              value={localDetails.hairColor}
              onChange={handleChange}
              placeholder="e.g., Brown, Blonde, Black"
              className="mt-1 block w-full rounded-md border-black-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="height" className="block text-sm font-medium text-black mb-1">
              Height (cm)
            </label>
            <input
              type="number"
              id="height"
              name="height"
              value={localDetails.height}
              onChange={handleChange}
              placeholder="e.g., 170"
              className="mt-1 block w-full rounded-md border-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="waist" className="block text-sm font-medium text-black mb-1">
              Waist (cm)
            </label>
            <input
              type="number"
              id="waist"
              name="waist"
              value={localDetails.waist}
              onChange={handleChange}
              placeholder="e.g., 80"
              className="mt-1 block w-full rounded-md border-black-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}