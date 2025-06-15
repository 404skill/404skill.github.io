import React, { FC, useState } from 'react'
import { ChevronDown, ChevronUp, BookOpen } from 'lucide-react'

interface SolutionProps {
    children: string
}

export const Solution: FC<SolutionProps> = ({ children }) => {
    const [open, setOpen] = useState(false)

    return (
        <div className="font-mono border-l-4 border-indigo-500 bg-indigo-50 p-4 my-4 rounded-md shadow-sm">
            <button
                onClick={() => setOpen((v) => !v)}
                className="flex items-center gap-2 text-indigo-700 focus:outline-none"
                aria-expanded={open}
            >
                <BookOpen className="h-5 w-5 text-indigo-700 flex-shrink-0" />
                <strong>{open ? 'Hide Solution' : 'Show Solution'}</strong>
                {open ? (
                    <ChevronUp className="h-4 w-4 text-indigo-700" />
                ) : (
                    <ChevronDown className="h-4 w-4 text-indigo-700" />
                )}
            </button>

            {open && (
                <div className="mt-2 text-sm text-slate-800 whitespace-pre-wrap">
                    {children}
                </div>
            )}
        </div>
    )
}
