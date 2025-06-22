// src/components/ui/VariantDropdown.tsx

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuPortal,
} from '@radix-ui/react-dropdown-menu';
import { Badge } from '@/components/ui/badge';

export interface VariantOption {
    value: string;
    label: string;
}

interface VariantDropdownProps {
    options: VariantOption[];
    value?: string;
    onChange: (value: string) => void;
}

const formatTechLabel = (raw: string): string  => {
    const clean = raw.trim().toLowerCase();
    return clean.length > 0
        ? clean[0].toUpperCase() + clean.slice(1)
        : '';
}

const renderTechBadges = (
    label: string,
    isSelected: boolean
): React.ReactNode[] => {
    return label
        .split(',')
        .map(formatTechLabel)
        .filter(Boolean)
        .map((tech) => (
            <Badge
                key={tech}
                variant={isSelected ? 'dropdownselected' : 'dropdown'}
                className="text-xs font-mono px-2 py-0.5"
            >
                {tech}
            </Badge>
        ));
}

export const VariantDropdown: React.FC<VariantDropdownProps> = ({
                                                                    options,
                                                                    value,
                                                                    onChange,
                                                                }) => {
    const selected = options.find(o => o.value === value) || options[0];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                asChild>
                <Button variant="outline"
                  size="sm"
                  className="
                    font-mono text-sm flex items-center gap-1
                    border border-gray-300 bg-transparent
                    hover:bg-transparent
                    hover:border-2 hover:border-blue-500
                    focus:ring-2 focus:ring-blue-300
                  "
                >
                    <div className="flex flex-wrap gap-1">{renderTechBadges(selected.label, false)}</div>
                    <ChevronRight className="h-4 w-4 rotate-90" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuPortal>
                <DropdownMenuContent
                    className={cn(
                        'z-50 min-w-[8rem] rounded-md border border-gray-200 bg-white p-2 shadow-lg cursor-pointer',
                        'focus:outline-none'
                    )}
                >
                    {options.map(option => {
                        const isSelected = option.value === value;
                        return (
                            <DropdownMenuItem
                                key={option.value}
                                onSelect={() => onChange(option.value)}
                                className={cn(
                                    'px-2 py-1 rounded-md hover:border hover:border-gray-300 transition-colors',
                                    'focus:outline-none focus:ring-0',
                                    isSelected
                                        ? 'bg-gray-100'
                                        : 'hover:bg-gray-100'
                                )}
                            >
                                <div className="flex flex-wrap gap-1">
                                    {renderTechBadges(option.label, isSelected)}
                                </div>
                            </DropdownMenuItem>
                        );
                    })}
                </DropdownMenuContent>
            </DropdownMenuPortal>
        </DropdownMenu>
    );
};
