"use client"

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

interface ActionTooltipProps {
    label: string;
    children: React.ReactNode
    side?: "top" | "bottom" | "left" | "right"
    align?: "start" | "center" | "end"
}

export const ActionTooltip = ({
    label,
    children,
    side,
    align,
}: ActionTooltipProps) => {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={50}>
                <TooltipTrigger asChild>
                    {children}
                </TooltipTrigger>
                <TooltipContent
                    side={side}
                    align={align}
                >
                    <p>
                        {label}
                    </p>                    
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}