import React from 'react';
import ProjectMarkdownContent from './ProjectMarkdownContent';
import { cn } from '@/lib/utils';

interface TaskMarkdownContentProps {
  projectId: string;
  taskNumber: number;
  className?: string;
}

const TaskMarkdownContent: React.FC<TaskMarkdownContentProps> = ({
  projectId,
  taskNumber,
  className = '',
}) => {
  const filePath = `${projectId}/${taskNumber}_${getTaskFileName(taskNumber)}`;

  return (
    <div
      className={cn(
        'prose-headings:font-mono prose-headings:text-slate-800',
        'prose-p:text-slate-600 prose-p:leading-relaxed',
        'prose-code:bg-slate-100 prose-code:p-0.5 prose-code:rounded prose-code:text-slate-800 prose-code:before:content-none prose-code:after:content-none',
        'prose-pre:bg-slate-50 prose-pre:border prose-pre:border-slate-200 prose-pre:rounded-md prose-pre:p-4',
        'prose-strong:font-medium prose-strong:text-slate-800',
        'prose-ul:text-slate-600 prose-ol:text-slate-600',
        'prose-li:marker:text-slate-400',
        'prose-table:border-collapse prose-table:border prose-table:border-slate-300',
        'prose-th:bg-slate-100 prose-th:p-2 prose-th:border prose-th:border-slate-300 prose-th:font-medium prose-th:text-slate-800',
        'prose-td:p-2 prose-td:border prose-td:border-slate-300',
        'prose-hr:border-slate-200',
        'prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline',
        className,
      )}
    >
      <ProjectMarkdownContent filePath={filePath} />
    </div>
  );
};

// Helper function to map task number to filename
function getTaskFileName(taskNumber: number): string {
  switch (taskNumber) {
    case 1:
      return 'storing_users.md';
    case 2:
      return 'creating_items.md';
    case 3:
      return 'borrowing_and_returning.md';
    case 4:
      return 'add_new_item_cds.md';
    case 5:
      return 'promotion_system.md';
    default:
      return '';
  }
}

export default TaskMarkdownContent;
