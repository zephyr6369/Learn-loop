"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Trash2, Plus, GripVertical } from "lucide-react"
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd"

interface Task {
  id: string
  text: string
  completed: boolean
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", text: "Complete Math Homework", completed: false },
    { id: "2", text: "Read Chapter 3 of Biology", completed: true },
    { id: "3", text: "Prepare for Chemistry Quiz", completed: false },
  ])
  const [newTask, setNewTask] = useState("")

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { id: Date.now().toString(), text: newTask.trim(), completed: false }])
      setNewTask("")
    }
  }

  const toggleTaskCompletion = (id: string) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return
    }

    const reorderedTasks = Array.from(tasks)
    const [movedTask] = reorderedTasks.splice(result.source.index, 1)
    reorderedTasks.splice(result.destination.index, 0, movedTask)

    setTasks(reorderedTasks)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">Your Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-4">
          <Input
            placeholder="Add a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                addTask()
              }
            }}
          />
          <Button onClick={addTask} className="bg-primary hover:bg-primary/90">
            <Plus className="h-5 w-5" />
            <span className="sr-only">Add Task</span>
          </Button>
        </div>

        {tasks.length === 0 ? (
          <p className="text-center text-muted-foreground">No tasks yet. Add one above!</p>
        ) : (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="tasks">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-3">
                  {tasks.map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className="flex items-center gap-3 p-3 border rounded-md bg-card hover:bg-muted/50 transition-colors"
                        >
                          <span {...provided.dragHandleProps} className="cursor-grab text-muted-foreground">
                            <GripVertical className="h-5 w-5" />
                          </span>
                          <Checkbox
                            id={`task-${task.id}`}
                            checked={task.completed}
                            onCheckedChange={() => toggleTaskCompletion(task.id)}
                            className="peer"
                          />
                          <Label
                            htmlFor={`task-${task.id}`}
                            className={`flex-1 text-base cursor-pointer ${task.completed ? "line-through text-muted-foreground" : ""}`}
                          >
                            {task.text}
                          </Label>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteTask(task.id)}
                            className="text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="h-5 w-5" />
                            <span className="sr-only">Delete Task</span>
                          </Button>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">
        <p>
          {"You have "}
          {tasks.filter((task) => !task.completed).length}
          {" tasks remaining."}
        </p>
      </CardFooter>
    </Card>
  )
}
