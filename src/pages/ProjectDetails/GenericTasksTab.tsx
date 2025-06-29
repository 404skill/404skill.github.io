// src/components/GenericTasksTab.tsx
import React, { useState } from 'react'
import type { FC } from 'react'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible'
import { Code2, ChevronUp, ChevronDown } from 'lucide-react'
import type { GenericTaskDTO } from '@/lib/types'
import TasksTabSkeleton from '@/components/skeletons/TasksTabSkeleton'
import { Button } from '@/components/ui/button'
import MarkdownRenderer from '@/components/markdown-renderer/MarkdownRenderer'

interface GenericTasksTabProps {
  projectId: string
  tasks: GenericTaskDTO[]
  tasksLoading: boolean
  tasksError: Error | null
  refetchTasks: () => void
}

export const GenericTasksTab: FC<GenericTasksTabProps> = ({
  tasks,
  tasksLoading,
  tasksError,
  refetchTasks,
}) => {
  const [openTasks, setOpenTasks] = useState<Record<string, boolean>>({})

  if (tasksLoading) return <TasksTabSkeleton />
  if (tasksError) {
    return (
      <div className="py-12 text-center font-mono text-red-500 space-y-2">
        <div>Error loading tasks</div>
        <Button onClick={refetchTasks} className="font-mono text-sm">
          Retry fetching tasks
        </Button>
      </div>
    )
  }
  if (!tasks.length) {
    return <div className="py-12 text-center font-mono">No tasks found for this project.</div>
  }

  const sorted = [...tasks].sort((a, b) => a.position - b.position)
  const total = sorted.length

  const toggle = (id: string) =>
    setOpenTasks(prev => ({ ...prev, [id]: !prev[id] }))

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-medium font-mono text-slate-800">Project Tasks</h3>
        <Badge variant="secondary" className="font-mono text-xs">
          {total} {total === 1 ? 'task' : 'tasks'}
        </Badge>
      </div>

      <div className="grid gap-4">
        {sorted.map((task, idx) => {
          const isOpen = !!openTasks[task.taskId]

          return (
            <Collapsible
              key={task.taskId}
              open={isOpen}
              onOpenChange={() => toggle(task.taskId)}
            >
              <Card className="border-l-4 border-l-blue-200 bg-slate-50">
                <CollapsibleTrigger asChild>
                  <CardHeader className="px-4 py-3 cursor-pointer">
                    <div className="flex justify-between items-start w-full">
                      <div className="flex items-center gap-2">
                        <Code2 className="h-5 w-5 text-blue-600" />
                        <span className="font-mono font-medium text-slate-800">
                          {idx + 1}. {task.taskName}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm">
                          {task.totalTests} {task.totalTests === 1 ? 'test' : 'tests'}
                        </span>
                        {isOpen ? (
                          <ChevronUp className="h-4 w-4 text-slate-400" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-slate-400" />
                        )}
                      </div>
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                <CardContent className="px-4 pb-4">
                  <div className="bg-white p-4 rounded-md">
                    <MarkdownRenderer content={task.description} />
                  </div>
                </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          )
        })}
      </div>
    </div>
  )
}
