import React, { FC } from 'react'
import { Lightbulb } from 'lucide-react'

interface TipProps {
    children: string
}

export const Tip: FC<TipProps> = ({ children }) => (
    <div className="flex items-start gap-2 border-l-4 border-green-500 bg-green-50 p-4 my-4">
        <Lightbulb className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
        <div>
            <strong>Tip:</strong> {children}
        </div>
    </div>
)
