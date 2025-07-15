import { TaskList } from "@/components/task-list"

export default function TasksPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-start justify-center bg-gradient-to-br from-white to-blue-50 p-4 md:p-8">
      <TaskList />
    </div>
  )
}
