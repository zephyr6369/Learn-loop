"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { NotebookPen, MessageSquareText, ListChecks, Clock, BarChart3 } from "lucide-react"
import Link from "next/link"
import { DailyGoalsManager } from "@/components/daily-goals-manager"
import { StudyTimer } from "@/components/study-timer"
import { TimeAnalysis } from "@/components/time-analysis"
import { ProtectedRoute } from "@/components/protected-route"
import { useState } from "react"

export default function DashboardPage() {
  const [studySessions, setStudySessions] = useState<
    { type: "focus" | "break"; duration: number; timestamp: string }[]
  >([])

  const addStudySession = (type: "focus" | "break", duration: number) => {
    setStudySessions((prev) => [...prev, { type, duration, timestamp: new Date().toLocaleString() }])
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto p-4 md:p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <ListChecks className="h-5 w-5 text-primary" /> Daily Goals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <DailyGoalsManager />
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <NotebookPen className="h-5 w-5 text-primary" /> Recent Notes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Quick access to your latest study notes.</p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span>Physics - Electromagnetism</span>
                  <span className="text-sm text-muted-foreground">2 days ago</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>History - World War II Causes</span>
                  <span className="text-sm text-muted-foreground">1 week ago</span>
                </div>
              </div>
              <Button asChild variant="outline" className="mt-4 w-full bg-transparent">
                <Link href="/notes">View All Notes</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <MessageSquareText className="h-5 w-5 text-primary" /> Quick AI Assistant
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Ask a quick question or generate a summary.</p>
              <Button asChild className="mt-4 w-full bg-primary hover:bg-primary/90">
                <Link href="/chat">Go to Chat</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" /> Study Timer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <StudyTimer onSessionComplete={addStudySession} />
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" /> Time Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <TimeAnalysis sessions={studySessions} />
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  )
}
