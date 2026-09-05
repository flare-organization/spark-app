import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import { cn } from '@/lib/utils'

const proseStyles = cn(
    'text-sm leading-relaxed',
    '[&_p]:my-3',
    '[&_a]:text-primary [&_a]:underline',
    '[&_h1]:mb-3 [&_h1]:font-mono [&_h1]:text-xl [&_h1]:font-semibold',
    '[&_h2]:mt-5 [&_h2]:mb-2 [&_h2]:font-mono [&_h2]:text-base [&_h2]:font-semibold',
    '[&_ul]:my-3 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:my-1',
    '[&_code]:bg-muted [&_code]:rounded [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-xs',
    '[&_pre]:my-3 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-muted [&_pre]:p-3',
    '[&_pre_code]:bg-transparent [&_pre_code]:p-0',
)

interface MarkdownContentProps {
    children: string
    className?: string
}

export function MarkdownContent({ children, className }: MarkdownContentProps) {
    return (
        <div className={cn(proseStyles, className)}>
            <Markdown remarkPlugins={[remarkGfm]}>{children}</Markdown>
        </div>
    )
}
