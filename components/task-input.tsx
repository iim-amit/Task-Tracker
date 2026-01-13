"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface TaskInputProps {
  onAddTask: (title: string) => Promise<void>
  isLoading: boolean
}

export function TaskInput({ onAddTask, isLoading }: TaskInputProps) {
  const [title, setTitle] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim()) {
      await onAddTask(title)
      setTitle("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full">
      <Input
        type="text"
        placeholder="Add a new task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={isLoading}
        className="flex-1"
      />
      <Button type="submit" disabled={isLoading} className="px-6">
        {isLoading ? "Adding..." : "Add Task"}
      </Button>
    </form>
  )
}
