import React, { FC } from 'react'
import { Star } from 'lucide-react'

interface ExampleProps {
    children: string
}

export const Example: FC<ExampleProps> = ({ children }) => {

    return (
        <div className="font-mono border-l-4 border-purple-400 bg-purple-50 p-4 my-4 rounded-md shadow-md">
            <div className="flex items-center gap-2 text-purple-800">
                <Star className="h-5 w-5 text-purple-500 flex-shrink-0" />
                <strong className="text-sm">Example:</strong>
            </div>

            <div className="mt-2 whitespace-pre-wrap text-sm text-purple-800">
                {children}
            </div>
        </div>
    )
}
