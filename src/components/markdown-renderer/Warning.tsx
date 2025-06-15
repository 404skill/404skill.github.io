import React, { FC } from 'react'
import { AlertTriangle } from 'lucide-react'

interface WarningProps {
    children: string
}

export const Warning: FC<WarningProps> = ({ children }) => {

    return (
        <div className="font-mono border-l-4 border-yellow-500 bg-yellow-50 p-4 my-4 rounded-md shadow-sm">
            <div className="flex items-center gap-2 text-yellow-800">
                <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0" />
                <strong className="text-sm">Warning:</strong>
            </div>
            <div className="mt-2 whitespace-pre-wrap text-sm text-yellow-800">
                {children}
            </div>
        </div>
    )
}
