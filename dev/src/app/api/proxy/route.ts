import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const body = await request.json()

  try {
    const response = await fetch(
      "https://rz1lbvvji6.execute-api.us-east-1.amazonaws.com/default/generateFitsFromImage",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    )

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch data from API" },
      { status: 500 }
    )
  }
}