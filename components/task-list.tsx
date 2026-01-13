"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

export interface Task {
  id: string
  title: string
  completed: boolean
  created_at: string
}

interface TaskListProps {
  tasks: Task[]
  onToggleComplete: (id: string, completed: boolean) => Promise<void>
  onDeleteTask: (id: string) => Promise<void>
  isLoading: boolean
}

export function TaskList({ tasks, onToggleComplete, onDeleteTask, isLoading }: TaskListProps) {
  return (
    <div className="space-y-2 w-full">
      {tasks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No tasks yet. Add one to get started!</p>
        </div>
      ) : (
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <Checkbox
                checked={task.completed}
                onCheckedChange={(checked) => onToggleComplete(task.id, checked === true)}
                disabled={isLoading}
              />
              <span className={`flex-1 ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                {task.title}
              </span>
              <span
                className={`text-xs px-2 py-1 rounded-full font-medium ${task.completed ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"}`}
              >
                {task.completed ? "Completed" : "Pending"}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDeleteTask(task.id)}
                disabled={isLoading}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Delete task</span>
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
