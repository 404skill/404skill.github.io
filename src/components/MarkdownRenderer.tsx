// src/components/MarkdownRenderer.tsx
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownRendererProps {
    content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
                // Override how Markdown <code> (both inline and fenced) renders:
                code({
                         inline,
                         className,
                         children,
                         ...props
                     }: {
                    // We only need these four fields
                    inline?: boolean;
                    className?: string;
                    children: React.ReactNode;
                    // allow any other props without TS errors
                    [key: string]: any;
                }) {
                    // detect ```js or ```ts (e.g. className="language-js")
                    const match = /language-(\w+)/.exec(className || "");
                    if (!inline && match) {
                        return (
                            <pre className="bg-slate-100 rounded-md p-4 overflow-auto">
                <code className={className} {...props}>
                  {children}
                </code>
              </pre>
                        );
                    }
                    // otherwise render inline code:
                    return (
                        <code className={`${className} bg-slate-100 px-1 rounded`} {...props}>
                            {children}
                        </code>
                    );
                },

                // Example overrides for headings and paragraphs:
                h1({ children, ...props }) {
                    return (
                        <h1 className="text-2xl font-bold mt-8 mb-4 font-mono" {...props}>
                            {children}
                        </h1>
                    );
                },
                h2({ children, ...props }) {
                    return (
                        <h2 className="text-xl font-semibold mt-6 mb-3 font-mono" {...props}>
                            {children}
                        </h2>
                    );
                },
                p({ children, ...props }) {
                    return (
                        <p className="mb-4 leading-relaxed font-mono text-slate-700" {...props}>
                            {children}
                        </p>
                    );
                },
                // …add any other overrides (ul, li, blockquote, etc.) if you wish
            }}
        >
            {content}
        </ReactMarkdown>
    );
};

export default MarkdownRenderer;
