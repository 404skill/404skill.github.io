import React, { useState } from 'react'
import type { FC } from 'react'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible'
import { Code, ChevronUp, ChevronDown, TestTube } from 'lucide-react'
import type { GenericTestsByTaskDTO } from '@/lib/types'
import TestsTabSkeleton from '@/components/skeletons/TestsTabSkeleton'
import { Button } from '@/components/ui/button'

interface GenericTestsTabProps {
  projectId: string
  testsByTask: GenericTestsByTaskDTO[]
  testsLoading: boolean
  testsError: Error | null
  refetchTests: () => void
}

const GenericTestsTab: FC<GenericTestsTabProps> = ({
  testsByTask,
  testsLoading,
  testsError,
  refetchTests,
}) => {
  const [openSuites, setOpenSuites] = useState<Record<string, boolean>>({})

  if (testsLoading) return <TestsTabSkeleton />
  if (testsError) {
    return (
      <div className="py-12 text-center font-mono text-red-500 space-y-2">
        <div>Error loading tests</div>
        <Button onClick={refetchTests} className="font-mono text-sm">
          Retry fetching tests
        </Button>
      </div>
    )
  }
  if (!testsByTask.length) {
    return <div className="py-12 text-center font-mono">No tests found for this project.</div>
  }

  const sorted = [...testsByTask].sort((a, b) => a.position - b.position)
  const totalTests = sorted.reduce((sum, g) => sum + g.totalTests, 0)

  const toggle = (id: string) =>
    setOpenSuites(prev => ({ ...prev, [id]: !prev[id] }))

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-medium font-mono text-slate-800">Project Tests</h3>
        <Badge variant="secondary" className="font-mono text-xs">
          {totalTests} {totalTests === 1 ? 'test' : 'tests'}
        </Badge>
      </div>

      <div className="space-y-4">
        {sorted.map((group, idx) => {
          const isOpen = !!openSuites[group.taskId]
          return (
            <Collapsible
              key={group.taskId}
              open={isOpen}
              onOpenChange={() => toggle(group.taskId)}
            >
              <Card className="border-l-4 border-l-blue-200 bg-slate-50">
                <CollapsibleTrigger asChild>
                  <CardHeader className="px-4 py-3 cursor-pointer">
                    <div className="flex justify-between items-start w-full">
                      <div className="flex items-center gap-2">
                        <Code className="h-5 w-5 text-slate-400" />
                        <span className="font-mono font-medium text-slate-800">
                          {idx + 1}. {group.taskName}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm">
                          {group.totalTests} {group.totalTests === 1 ? 'test' : 'tests'}
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
                  <CardContent className="px-4 pb-4 space-y-2">
                    {group.tests.map((test, index) => (
                      <div
                        key={test.testId}
                        className="flex items-center justify-between bg-white border border-slate-200 rounded-md p-3"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm text-slate-800">
                            {index + 1}. {test.testName}
                          </span>
                        </div>
                      </div>
                    ))}
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

export default GenericTestsTab
