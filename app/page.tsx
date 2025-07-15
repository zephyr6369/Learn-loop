import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, BookOpenText, ListChecks, Lightbulb } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-gradient-to-br from-white to-blue-50 p-4 md:p-8">
      <section className="text-center max-w-3xl space-y-6 mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
          {"Boost your learning with "}
          <span className="text-primary">LearnLoop</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600">
          Your AI-Powered Study Companion. Stay focused, organize study sessions, ask doubts, generate summaries, and
          track your daily academic progress.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white">
            <Link href="/signup">Start Studying</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-primary text-primary hover:bg-primary/5 bg-transparent"
          >
            <Link href="/login">Log In</Link>
          </Button>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        <Card className="text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <Brain className="h-12 w-12 text-primary mx-auto mb-4" />
            <CardTitle className="text-xl font-semibold">AI Study Assistant</CardTitle>
          </CardHeader>
          <CardContent>Get instant answers, explanations, and summaries from Gemini AI.</CardContent>
        </Card>
        <Card className="text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <ListChecks className="h-12 w-12 text-primary mx-auto mb-4" />
            <CardTitle className="text-xl font-semibold">Task Management</CardTitle>
          </CardHeader>
          <CardContent>Organize assignments, set deadlines, and track your progress effortlessly.</CardContent>
        </Card>
        <Card className="text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <BookOpenText className="h-12 w-12 text-primary mx-auto mb-4" />
            <CardTitle className="text-xl font-semibold">Note Taking</CardTitle>
          </CardHeader>
          <CardContent>Save and organize your study notes, whether text or voice.</CardContent>
        </Card>
        <Card className="text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <Lightbulb className="h-12 w-12 text-primary mx-auto mb-4" />
            <CardTitle className="text-xl font-semibold">Progress Tracking</CardTitle>
          </CardHeader>
          <CardContent>Monitor your daily academic progress and stay motivated.</CardContent>
        </Card>
      </section>
    </div>
  )
}
