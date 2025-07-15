"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Trash2, Plus } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Goal {
  id: string
  text: string
  completed: boolean
}

export function DailyGoalsManager() {
  const [goals, setGoals] = useState<Goal[]>([
    { id: "1", text: "Finish Calculus problem set", completed: false },
    { id: "2", text: "Review English essay feedback", completed: true },
  ])
  const [newGoal, setNewGoal] = useState("")

  const addGoal = () => {
    if (newGoal.trim() !== "") {
      setGoals([...goals, { id: Date.now().toString(), text: newGoal.trim(), completed: false }])
      setNewGoal("")
    }
  }

  const toggleGoalCompletion = (id: string) => {
    setGoals(goals.map((goal) => (goal.id === id ? { ...goal, completed: !goal.completed } : goal)))
  }

  const deleteGoal = (id: string) => {
    setGoals(goals.filter((goal) => goal.id !== id))
  }

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <Input
          placeholder="Add a new daily goal..."
          value={newGoal}
          onChange={(e) => setNewGoal(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              addGoal()
            }
          }}
        />
        <Button onClick={addGoal} className="bg-primary hover:bg-primary/90">
          <Plus className="h-5 w-5" />
          <span className="sr-only">Add Goal</span>
        </Button>
      </div>

      {goals.length === 0 ? (
        <p className="text-center text-muted-foreground">No daily goals set. Add one above!</p>
      ) : (
        <ScrollArea className="h-[150px] pr-4">
          <div className="space-y-3">
            {goals.map((goal) => (
              <div key={goal.id} className="flex items-center gap-3 p-2 border rounded-md bg-card">
                <Checkbox
                  id={`goal-${goal.id}`}
                  checked={goal.completed}
                  onCheckedChange={() => toggleGoalCompletion(goal.id)}
                  className="peer"
                />
                <Label
                  htmlFor={`goal-${goal.id}`}
                  className={`flex-1 text-base cursor-pointer ${goal.completed ? "line-through text-muted-foreground" : ""}`}
                >
                  {goal.text}
                </Label>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteGoal(goal.id)}
                  className="text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-5 w-5" />
                  <span className="sr-only">Delete Goal</span>
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>
      )}
      <p className="text-sm text-muted-foreground mt-4">
        {"You have "}
        {goals.filter((goal) => !goal.completed).length}
        {" daily goals remaining."}
      </p>
    </div>
  )
}
