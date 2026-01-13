import { TaskTracker } from "@/components/task-tracker"

export const metadata = {
  title: "Task Tracker - Manage Your Tasks",
  description: "A simple and efficient task management application",
}

export default function Page() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-background">
      <TaskTracker />
    </main>
  )
}
