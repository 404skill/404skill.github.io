// src/pages/ProjectsDashboard/ProjectFilterBar.tsx

import React, { FC } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Filter, Search } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu';

interface ProjectFilterBarProps {
  searchTerm: string;
  setSearchTerm: (s: string) => void;
  difficultyFilter: string[];
  toggleDifficulty: (level: string) => void;
}

const ProjectFilterBar: FC<ProjectFilterBarProps> = ({
                                                       searchTerm,
                                                       setSearchTerm,
                                                       difficultyFilter,
                                                       toggleDifficulty,
                                                     }) => {
  return (
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <Input
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-slate-200 focus:border-blue-300 focus:ring-blue-200 transition-all duration-300 font-mono"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
                variant="outline"
                className="flex items-center gap-2 border-slate-200 hover:border-slate-300 transition-colors font-mono"
            >
              <Filter className="h-4 w-4 text-slate-500" />
              <span>Filter</span>
              {difficultyFilter.length > 0 && (
                  <span className="ml-1 rounded-full bg-blue-100 text-blue-700 px-2 py-0.5 text-xs">
                {difficultyFilter.length}
              </span>
              )}
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="animate-fade-in">
            <DropdownMenuCheckboxItem
                checked={difficultyFilter.includes('easy')}
                onCheckedChange={() => toggleDifficulty('easy')}
                className="hover:bg-green-50 font-mono"
            >
            <span className="flex items-center">
              <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
              Easy
            </span>
            </DropdownMenuCheckboxItem>

            <DropdownMenuCheckboxItem
                checked={difficultyFilter.includes('medium')}
                onCheckedChange={() => toggleDifficulty('medium')}
                className="hover:bg-blue-50 font-mono"
            >
            <span className="flex items-center">
              <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
              Medium
            </span>
            </DropdownMenuCheckboxItem>

            <DropdownMenuCheckboxItem
                checked={difficultyFilter.includes('hard')}
                onCheckedChange={() => toggleDifficulty('hard')}
                className="hover:bg-purple-50 font-mono"
            >
            <span className="flex items-center">
              <span className="w-2 h-2 rounded-full bg-purple-500 mr-2"></span>
              Hard
            </span>
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
  );
};

export default ProjectFilterBar;
