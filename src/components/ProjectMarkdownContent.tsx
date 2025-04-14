
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

interface ProjectMarkdownContentProps {
  filePath: string;
  className?: string;
}

const ProjectMarkdownContent: React.FC<ProjectMarkdownContentProps> = ({ filePath, className = '' }) => {
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setIsLoading(true);
        
        // Use dynamic import to get the markdown content
        const module = await import(`../lib/projects/${filePath}`);
        
        // Check if the module has a default export
        if (module.default) {
          setContent(module.default);
        } else {
          throw new Error("Failed to load markdown content");
        }
        
        setIsLoading(false);
      } catch (err) {
        console.error("Error loading markdown:", err);
        setError("Failed to load content");
        setIsLoading(false);
      }
    };

    fetchContent();
  }, [filePath]);

  if (isLoading) {
    return <div className="animate-pulse p-4 bg-slate-100 rounded-md h-32"></div>;
  }

  if (error) {
    return <div className="text-red-500 p-4 border border-red-300 rounded-md">{error}</div>;
  }

  return (
    <div className={`markdown-content prose prose-slate max-w-none ${className}`}>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};

export default ProjectMarkdownContent;
