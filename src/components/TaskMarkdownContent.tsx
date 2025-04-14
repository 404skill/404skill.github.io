
import React from 'react';
import ProjectMarkdownContent from './ProjectMarkdownContent';

interface TaskMarkdownContentProps {
  projectId: string;
  taskNumber: number;
  className?: string;
}

const TaskMarkdownContent: React.FC<TaskMarkdownContentProps> = ({ projectId, taskNumber, className = '' }) => {
  const filePath = `${projectId}/${taskNumber}_${getTaskFileName(taskNumber)}`;
  
  return <ProjectMarkdownContent filePath={filePath} className={className} />;
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
