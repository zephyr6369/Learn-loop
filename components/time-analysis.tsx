"use client"

import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Hourglass, Coffee } from "lucide-react"

interface Session {
  type: "focus" | "break"
  duration: number // in minutes
  timestamp: string
}

interface TimeAnalysisProps {
  sessions: Session[]
}

export function TimeAnalysis({ sessions }: TimeAnalysisProps) {
  const totalFocusTime = sessions.filter((s) => s.type === "focus").reduce((sum, s) => sum + s.duration, 0)

  const totalBreakTime = sessions.filter((s) => s.type === "break").reduce((sum, s) => sum + s.duration, 0)

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 text-center shadow-sm">
          <Hourglass className="h-8 w-8 text-primary mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">Total Focus Time</p>
          <p className="text-2xl font-bold text-gray-900">{totalFocusTime} min</p>
        </Card>
        <Card className="p-4 text-center shadow-sm">
          <Coffee className="h-8 w-8 text-primary mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">Total Break Time</p>
          <p className="text-2xl font-bold text-gray-900">{totalBreakTime} min</p>
        </Card>
      </div>

      <h3 className="text-lg font-semibold mt-2">Recent Sessions</h3>
      {sessions.length === 0 ? (
        <p className="text-center text-muted-foreground">No sessions recorded yet. Start the timer!</p>
      ) : (
        <ScrollArea className="h-[200px] pr-4">
          <div className="space-y-3">
            {sessions
              .slice()
              .reverse()
              .map((session, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-md bg-card">
                  <div className="flex items-center gap-3">
                    {session.type === "focus" ? (
                      <Hourglass className="h-5 w-5 text-green-600" />
                    ) : (
                      <Coffee className="h-5 w-5 text-orange-500" />
                    )}
                    <div>
                      <p className="font-medium capitalize">{session.type} Session</p>
                      <p className="text-sm text-muted-foreground">{session.duration} minutes</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{session.timestamp}</p>
                </div>
              ))}
          </div>
        </ScrollArea>
      )}
    </div>
  )
}
