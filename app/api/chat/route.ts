import { google } from "@ai-sdk/google"
import { streamText } from "ai"

// Allow streaming responses up to 30 seconds
export const maxDuration = 30
export const runtime = 'edge'

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    // Ensure API key is available
    if (!process.env.GEMINI_API_KEY) {
      return new Response("Gemini API key not configured", { status: 500 })
    }

    const result = streamText({
      model: google("models/gemini-1.5-flash", {
        apiKey: process.env.GEMINI_API_KEY,
      }),
      system:
        "You are a helpful and patient AI study assistant called LearnLoop AI. Respond with simple explanations, summaries, or encouragement. Use a warm and friendly tone. Keep answers concise and avoid long textbook-style responses. Focus on helping students learn effectively.",
      messages,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("Chat API Error:", error)
    return new Response("Internal Server Error", { status: 500 })
  }
}
