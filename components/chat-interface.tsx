"use client"

import type React from "react"

import { useChat } from "ai/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Send, Loader2, MessageSquarePlus, Eraser, AlertCircle } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useEffect, useRef, useState } from "react"

export function ChatInterface() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, setMessages, error } = useChat({
    api: "/api/chat",
  })
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [connectionError, setConnectionError] = useState<string | null>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (error) {
      setConnectionError("Failed to connect to AI assistant. Please try again.")
    } else {
      setConnectionError(null)
    }
  }, [error])

  const handleClearChat = () => {
    setMessages([])
    setConnectionError(null)
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setConnectionError(null)
    handleSubmit(e)
  }

  // Function to format timestamp
  const formatTimestamp = (timestamp: Date) => {
    return timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <Card className="w-full max-w-3xl mx-auto h-[80vh] flex flex-col shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-2xl font-semibold">AI Study Assistant</CardTitle>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={handleClearChat} disabled={messages.length === 0}>
            <Eraser className="h-5 w-5" />
            <span className="sr-only">Clear Chat</span>
          </Button>
          <Button variant="outline" size="icon">
            <MessageSquarePlus className="h-5 w-5" />
            <span className="sr-only">Save Notes</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden p-0">
        <ScrollArea className="h-full p-4">
          <div className="space-y-4">
            {connectionError && (
              <div className="flex items-center gap-2 p-3 bg-destructive/10 text-destructive rounded-lg">
                <AlertCircle className="h-5 w-5" />
                <span>{connectionError}</span>
              </div>
            )}
            {messages.length === 0 && !isLoading ? (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground text-center py-12">
                <MessageSquarePlus className="h-12 w-12 mb-4 text-primary" />
                <p className="text-lg">Start a conversation with your AI study companion!</p>
                <p className="text-sm">Ask a question, generate a summary, or get an explanation.</p>
              </div>
            ) : (
              messages.map((m) => (
                <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[70%] p-3 rounded-lg shadow-sm ${
                      m.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-none"
                        : "bg-muted text-muted-foreground rounded-bl-none"
                    }`}
                  >
                    <p className="text-sm font-medium mb-1">{m.role === "user" ? "You" : "LearnLoop AI"}</p>
                    <div className="text-base whitespace-pre-wrap">{m.content}</div>
                    <p className="text-xs text-right mt-1 opacity-75">
                      {formatTimestamp(new Date(m.createdAt || Date.now()))}
                    </p>
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[70%] p-3 rounded-lg shadow-sm bg-muted text-muted-foreground rounded-bl-none">
                  <p className="text-sm font-medium mb-1">LearnLoop AI</p>
                  <div className="flex items-center">
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    <span>Thinking...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="p-4 border-t">
        <form onSubmit={handleFormSubmit} className="flex w-full items-center space-x-2">
          <Input
            placeholder="Type your message..."
            value={input}
            onChange={handleInputChange}
            className="flex-1"
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="icon"
            disabled={isLoading || input.trim() === ""}
            className="bg-primary hover:bg-primary/90"
          >
            <Send className="h-5 w-5" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}
