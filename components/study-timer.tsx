"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Play, Pause, RotateCcw } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface StudyTimerProps {
  onSessionComplete: (type: "focus" | "break", duration: number) => void
}

export function StudyTimer({ onSessionComplete }: StudyTimerProps) {
  const [focusTime, setFocusTime] = useState(25) // minutes
  const [breakTime, setBreakTime] = useState(5) // minutes
  const [timeLeft, setTimeLeft] = useState(focusTime * 60) // seconds
  const [isRunning, setIsRunning] = useState(false)
  const [isFocusSession, setIsFocusSession] = useState(true) // true for focus, false for break
  const [initialTime, setInitialTime] = useState(focusTime * 60) // To calculate progress
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const startTimer = useCallback(() => {
    if (!isRunning) {
      setIsRunning(true)
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current!)
            setIsRunning(false)
            onSessionComplete(isFocusSession ? "focus" : "break", initialTime / 60) // Log session
            // Switch to next session
            if (isFocusSession) {
              setIsFocusSession(false)
              setTimeLeft(breakTime * 60)
              setInitialTime(breakTime * 60)
            } else {
              setIsFocusSession(true)
              setTimeLeft(focusTime * 60)
              setInitialTime(focusTime * 60)
            }
            return 0 // Ensure it hits 0 before resetting
          }
          return prevTime - 1
        })
      }, 1000)
    }
  }, [isRunning, isFocusSession, focusTime, breakTime, initialTime, onSessionComplete])

  const pauseTimer = useCallback(() => {
    if (isRunning && timerRef.current) {
      clearInterval(timerRef.current)
      setIsRunning(false)
    }
  }, [isRunning])

  const resetTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
    setIsRunning(false)
    setIsFocusSession(true)
    setTimeLeft(focusTime * 60)
    setInitialTime(focusTime * 60)
  }, [focusTime])

  useEffect(() => {
    // Update timeLeft and initialTime when focusTime/breakTime changes, only if not running
    if (!isRunning) {
      setTimeLeft(isFocusSession ? focusTime * 60 : breakTime * 60)
      setInitialTime(isFocusSession ? focusTime * 60 : breakTime * 60)
    }
  }, [focusTime, breakTime, isFocusSession, isRunning])

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [])

  const progressValue = initialTime > 0 ? ((initialTime - timeLeft) / initialTime) * 100 : 0

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex w-full gap-4 mb-4">
        <div className="grid gap-2 flex-1">
          <Label htmlFor="focus-time">Focus Time (min)</Label>
          <Input
            id="focus-time"
            type="number"
            value={focusTime}
            onChange={(e) => setFocusTime(Math.max(1, Number.parseInt(e.target.value) || 25))}
            min="1"
            disabled={isRunning}
          />
        </div>
        <div className="grid gap-2 flex-1">
          <Label htmlFor="break-time">Break Time (min)</Label>
          <Input
            id="break-time"
            type="number"
            value={breakTime}
            onChange={(e) => setBreakTime(Math.max(1, Number.parseInt(e.target.value) || 5))}
            min="1"
            disabled={isRunning}
          />
        </div>
      </div>

      <div className="text-center">
        <p className="text-lg text-muted-foreground">{isFocusSession ? "Focus Session" : "Break Session"}</p>
        <div className="text-6xl font-bold tabular-nums text-primary">{formatTime(timeLeft)}</div>
      </div>

      <Progress value={progressValue} className="w-full h-2 bg-muted" />

      <div className="flex gap-4 mt-4">
        <Button onClick={isRunning ? pauseTimer : startTimer} className="bg-primary hover:bg-primary/90">
          {isRunning ? <Pause className="h-5 w-5 mr-2" /> : <Play className="h-5 w-5 mr-2" />}
          {isRunning ? "Pause" : "Start"}
        </Button>
        <Button variant="outline" onClick={resetTimer} disabled={!isRunning && timeLeft === initialTime}>
          <RotateCcw className="h-5 w-5 mr-2" />
          Reset
        </Button>
      </div>
    </div>
  )
}
