import React, { FC } from 'react'
import { Lightbulb } from 'lucide-react'

interface TipProps {
    children: string
}

export const Tip: FC<TipProps> = ({ children }) => {
    return (
        <div className="font-mono border-l-4 border-cyan-500 bg-cyan-50 p-4 my-4 rounded-md shadow-sm">
            <div className="flex items-center gap-2 text-cyan-800">
                <Lightbulb className="h-5 w-5 text-cyan-500 flex-shrink-0" />
                <strong className="text-sm">Tip:</strong>
            </div>
            <div className="mt-2 whitespace-pre-wrap text-sm">
                {children}
            </div>
        </div>
    )
}
