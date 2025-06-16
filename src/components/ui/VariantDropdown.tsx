import * as React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuPortal
} from "@radix-ui/react-dropdown-menu";

export interface VariantOption {
    value: string;
    label: string;
}

interface VariantDropdownProps {
    options: VariantOption[];
    value?: string;
    onChange: (value: string) => void;
}

export const VariantDropdown: React.FC<VariantDropdownProps> = ({
                                                                    options,
                                                                    value,
                                                                    onChange,
                                                                }) => {
    const selected = options.find((option) => option.value === value) || options[0];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="font-mono text-sm flex items-center gap-1"
                >
                    {selected.label}
                    <ChevronRight className="h-4 w-4 rotate-90" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuPortal>
                <DropdownMenuContent
                    className={cn(
                        'z-50 min-w-[8rem] rounded-md border border-gray-200 bg-white p-1 shadow-lg cursor-pointer',
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
                                    'px-3 py-2 text-sm font-mono rounded-sm transition-colors',
                                    isSelected
                                        ? 'bg-blue-100 text-blue-800 font-semibold'
                                        : 'hover:bg-gray-100'
                                )}
                            >
                                {option.label}
                            </DropdownMenuItem>
                        );
                    })}
                </DropdownMenuContent>
            </DropdownMenuPortal>
        </DropdownMenu>
    );
};
