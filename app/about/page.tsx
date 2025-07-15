import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Lightbulb, ShieldCheck, Users } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 text-center">About LearnLoop</h1>

      <section className="max-w-3xl mx-auto text-center mb-12 space-y-4">
        <p className="text-lg text-gray-700">
          LearnLoop is your dedicated AI-powered study companion, designed to revolutionize how students learn and
          manage their academic lives. Our mission is to empower learners with smart tools that foster focus,
          organization, and deeper understanding.
        </p>
        <p className="text-lg text-gray-700">
          From clarifying complex concepts with our AI assistant to organizing your daily tasks and notes, LearnLoop is
          built to support your journey towards academic excellence.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <Card className="text-center p-6 shadow-md">
          <CardHeader>
            <Lightbulb className="h-12 w-12 text-primary mx-auto mb-4" />
            <CardTitle className="text-xl font-semibold">Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            To provide accessible, intelligent, and intuitive tools that enhance the learning experience and help
            students achieve their full potential.
          </CardContent>
        </Card>

        <Card className="text-center p-6 shadow-md">
          <CardHeader>
            <Users className="h-12 w-12 text-primary mx-auto mb-4" />
            <CardTitle className="text-xl font-semibold">AI Disclaimer</CardTitle>
          </CardHeader>
          <CardContent>
            Our AI assistant, powered by Gemini Pro, is designed to provide helpful explanations and summaries. It is a
            supplementary tool and should not replace critical thinking, expert tutoring, or official academic
            resources. Always verify information.
          </CardContent>
        </Card>

        <Card className="text-center p-6 shadow-md">
          <CardHeader>
            <ShieldCheck className="h-12 w-12 text-primary mx-auto mb-4" />
            <CardTitle className="text-xl font-semibold">Privacy Information</CardTitle>
          </CardHeader>
          <CardContent>
            We are committed to protecting your privacy. LearnLoop collects minimal data necessary for app functionality
            and does not share your personal study data with third parties without your explicit consent.
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
