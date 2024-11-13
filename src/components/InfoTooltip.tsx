import { Info } from 'lucide-react'
import { TooltipRoot, TooltipTrigger, TooltipContent } from './ui/tooltip'

interface InfoTooltipProps {
  text: string
}

export function InfoTooltip({ text }: InfoTooltipProps) {
  return (
    <TooltipRoot>
      <TooltipTrigger asChild>
        <Info className="h-4 w-4 text-muted-foreground cursor-help inline-block ml-1" />
      </TooltipTrigger>
      <TooltipContent>
        <p>{text}</p>
      </TooltipContent>
    </TooltipRoot>
  )
}