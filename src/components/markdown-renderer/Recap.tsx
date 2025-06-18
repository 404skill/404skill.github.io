import React, { FC } from 'react'
import { Lightbulb } from 'lucide-react'

interface RecapProps {
    children: string
}

export const Recap: FC<RecapProps> = ({ children }) => {
    return (
        <div className="font-mono border-l-4 border-green-500 bg-green-50 p-4 my-4 rounded-md shadow-sm">
            <div className="flex items-center gap-2 text-green-800">
                <Lightbulb className="h-5 w-5 text-green-500 flex-shrink-0" />
                <strong className="text-sm">Main takeaway, lets recap:</strong>
            </div>
            <div className="mt-2 whitespace-pre-wrap text-sm">
                {children}
            </div>
        </div>
    )
}
