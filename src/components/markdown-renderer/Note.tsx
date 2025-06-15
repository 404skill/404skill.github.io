import React, { FC } from 'react'
import { Info } from 'lucide-react'

interface NoteProps {
    children: string
}

export const Note: FC<NoteProps> = ({ children }) => {

    return (
        <div className="font-mono border-l-4 border-slate-500 bg-slate-50 p-4 my-4 rounded-md shadow-sm">
            <div className="flex items-center gap-2 text-slate-800">
                <Info className="h-5 w-5 text-slate-600 flex-shrink-0" />
                <strong className="text-sm">Note:</strong>
            </div>
            <div className="mt-2 whitespace-pre-wrap text-sm text-slate-800">
                {children}
            </div>
        </div>
    )
}
