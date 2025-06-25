import React, { FC } from 'react'
import ReactMarkdown, { Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkDirective from 'remark-directive'
import rehypeRaw from 'rehype-raw'
import { visit } from 'unist-util-visit'

import { Hint }     from '@/components/markdown-renderer/Hint'
import { Warning }  from '@/components/markdown-renderer/Warning'
import { Note }     from '@/components/markdown-renderer/Note'
import { Tip }      from '@/components/markdown-renderer/Tip'
import { Example }  from '@/components/markdown-renderer/Example'
import { Solution } from '@/components/markdown-renderer/Solution'

function remarkCustomContainers() {
    return (tree: any) => {
        visit(tree, (node: any) => {
            if (
                node.type === 'containerDirective' &&
                ['hint','warning','note','tip','example','solution'].includes(node.name)
            ) {
                node.data = node.data || {}
                node.data.hName       = node.name
                node.data.hProperties = node.attributes || {}
            }
        })
    }
}

interface MarkdownRendererProps {
    content: string
}

const MarkdownRenderer: FC<MarkdownRendererProps> = ({ content }) => {
    const components = {
        code: ({ inline, className, children, ...props }: any) => {
            const match = /language-(\w+)/.exec(className || '')
            if (!inline && match) {
                return (
                    <pre className="bg-slate-100 rounded-md p-4 overflow-auto">
            <code className={className} {...props}>
              {children}
            </code>
          </pre>
                )
            }
            return (
                <code className={`${className} bg-slate-100 px-1 rounded`} {...props}>
                    {children}
                </code>
            )
        },

        hint: ({ children }: { children: any })    => <Hint>{children}</Hint>,
        warning: ({ children }: { children: any }) => <Warning>{children}</Warning>,
        note: ({ children }: { children: any })    => <Note>{children}</Note>,
        tip: ({ children }: { children: any })     => <Tip>{children}</Tip>,
        example: ({ children }: { children: any }) => <Example>{children}</Example>,
        solution: ({ children }: { children: any })=> <Solution>{children}</Solution>,

        // your existing overrides…
        h1: ({ children, ...props }: any) => (
            <h1 className="text-2xl font-bold mt-8 mb-4 font-mono" {...props}>
                {children}
            </h1>
        ),
        h2: ({ children, ...props }: any) => (
            <h2 className="text-xl font-semibold mt-6 mb-3 font-mono" {...props}>
                {children}
            </h2>
        ),
        p: ({ children, ...props }: any) => (
            <p className="leading-relaxed font-mono text-slate-700" {...props}>
                {children}
            </p>
        ),
        ul: ({ children }: { children: React.ReactNode }) => (
            <ul className="list-disc list-inside ml-4">{children}</ul>
        ),
        li: ({ children }: { children: React.ReactNode }) => (
            <li className="mb-1">{children}</li>
        ),
    } as Components & {
        [K in
            | 'hint'
            | 'warning'
            | 'note'
            | 'tip'
            | 'example'
            | 'solution'
        ]: FC<{ children: any }>
    }

    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkDirective, remarkCustomContainers]}
            rehypePlugins={[rehypeRaw]}
            components={components}
        >
            {content}
        </ReactMarkdown>
    )
}

export default MarkdownRenderer
