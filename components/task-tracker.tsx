"use client"

import { useEffect, useState } from "react"
import { TaskInput } from "./task-input"
import { TaskList, type Task } from "./task-list"
import { Card } from "@/components/ui/card"

export function TaskTracker() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isInitialLoading, setIsInitialLoading] = useState(true)

  // Load tasks on mount
  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      setIsInitialLoading(true)
      const response = await fetch("/api/tasks")
      if (response.ok) {
        const data = await response.json()
        setTasks(data)
      }
    } catch (error) {
      console.error("Failed to fetch tasks:", error)
    } finally {
      setIsInitialLoading(false)
    }
  }

  const handleAddTask = async (title: string) => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      })

      if (response.ok) {
        const newTask = await response.json()
        setTasks([newTask, ...tasks])
      }
    } catch (error) {
      console.error("Failed to add task:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleToggleComplete = async (id: string, completed: boolean) => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/tasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed }),
      })

      if (response.ok) {
        const updatedTask = await response.json()
        setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)))
      }
    } catch (error) {
      console.error("Failed to update task:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteTask = async (id: string) => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setTasks(tasks.filter((task) => task.id !== id))
      }
    } catch (error) {
      console.error("Failed to delete task:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Task Tracker</h1>
          <p className="text-muted-foreground">Stay organized by managing your tasks efficiently</p>
        </div>

        <TaskInput onAddTask={handleAddTask} isLoading={isLoading} />

        {isInitialLoading ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Loading tasks...</p>
          </div>
        ) : (
          <TaskList
            tasks={tasks}
            onToggleComplete={handleToggleComplete}
            onDeleteTask={handleDeleteTask}
            isLoading={isLoading}
          />
        )}

        {tasks.length > 0 && (
          <div className="pt-4 border-t border-border flex justify-between text-sm text-muted-foreground">
            <span>{tasks.filter((t) => !t.completed).length} pending</span>
            <span>{tasks.filter((t) => t.completed).length} completed</span>
          </div>
        )}
      </Card>
    </div>
  )
}
