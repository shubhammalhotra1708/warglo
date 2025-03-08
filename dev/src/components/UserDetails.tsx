"use client"

import { useState, type ChangeEvent } from "react"

interface UserDetailsProps {
  onChange: (details: {
    skinTone: string
    hairColor: string
    height: string
    waist: string
  }) => void
}

export default function UserDetails({ onChange }: UserDetailsProps) {
  const [details, setDetails] = useState({
    skinTone: "",
    hairColor: "",
    height: "",
    waist: "",
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    const newDetails = { ...details, [name]: value }
    setDetails(newDetails)
    onChange(newDetails)
  }

  return (
    <div className="w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4">Additional Details (Optional)</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="skinTone" className="block text-sm font-medium text-gray-700 mb-1">
            Skin Tone
          </label>
          <select
            id="skinTone"
            name="skinTone"
            value={details.skinTone}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="">Select skin tone</option>
            <option value="fair">Fair</option>
            <option value="light">Light</option>
            <option value="medium">Medium</option>
            <option value="olive">Olive</option>
            <option value="brown">Brown</option>
            <option value="dark">Dark</option>
          </select>
        </div>
        <div>
          <label htmlFor="hairColor" className="block text-sm font-medium text-gray-700 mb-1">
            Hair Color
          </label>
          <input
            type="text"
            id="hairColor"
            name="hairColor"
            value={details.hairColor}
            onChange={handleChange}
            placeholder="e.g., Brown, Blonde, Black"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-1">
            Height (cm)
          </label>
          <input
            type="number"
            id="height"
            name="height"
            value={details.height}
            onChange={handleChange}
            placeholder="e.g., 170"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="waist" className="block text-sm font-medium text-gray-700 mb-1">
            Waist (cm)
          </label>
          <input
            type="number"
            id="waist"
            name="waist"
            value={details.waist}
            onChange={handleChange}
            placeholder="e.g., 80"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
      </div>
    </div>
  )
}

