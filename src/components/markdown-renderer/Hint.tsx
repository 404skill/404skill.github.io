import React, { useState, useEffect, FC } from 'react'
import { Lightbulb, X } from 'lucide-react'
import { useFloating, offset, flip, shift, autoUpdate } from '@floating-ui/react-dom'

interface HintProps {
    children: string
}

export const Hint: FC<HintProps> = ({ children }) => {
    const [open, setOpen] = useState(false)
    const { x, y, strategy, refs } = useFloating({
        placement: 'bottom',
        middleware: [offset(10), flip(), shift({ padding: 8 })],
        whileElementsMounted: autoUpdate,
    })

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            const referenceEl = refs.reference.current
            const floatingEl = refs.floating.current
            if (open && referenceEl && floatingEl) {
                const target = event.target as Node
                const clickedInsideReference = referenceEl instanceof Element && referenceEl.contains(target)
                const clickedInsideFloating = floatingEl instanceof Element && floatingEl.contains(target)
                if (!clickedInsideReference && !clickedInsideFloating) {
                    setOpen(false)
                }
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [open, refs])

    return (
        <div className="inline-block">
            <button
                ref={refs.setReference}
                onClick={() => setOpen((v) => !v)}
                className="text-blue-600 hover:text-blue-800 focus:outline-none align-text-bottom transition-transform duration-200 ease-in-out hover:scale-110 hover:-translate-y-0.5"
                aria-label="Show hint"
            >
                <Lightbulb className="h-5 w-5" />
            </button>

            {open && (
                <div
                    ref={refs.setFloating}
                    className="z-10 w-64 rounded border-l-4 border-blue-500 bg-blue-50 p-4 shadow-lg"
                    style={{
                        position: strategy,
                        top: y ?? 0,
                        left: x ?? 0,
                    }}
                >
                    <button
                        onClick={() => setOpen(false)}
                        className="absolute top-1 right-1 text-gray-500 hover:text-gray-700 focus:outline-none"
                        aria-label="Close hint"
                    >
                        <X size={16} />
                    </button>

                    <div className="mt-2 text-sm text-slate-800">{children}</div>
                </div>
            )}
        </div>
    )
}