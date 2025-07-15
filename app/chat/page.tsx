import { ChatInterface } from "@/components/chat-interface"

export default function ChatPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gradient-to-br from-white to-blue-50 p-4 md:p-8">
      <ChatInterface />
    </div>
  )
}
