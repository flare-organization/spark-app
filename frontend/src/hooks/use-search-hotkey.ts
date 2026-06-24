import { useEffect, type RefObject } from 'react'

export function useSearchHotkey(ref: RefObject<HTMLInputElement | null>) {
    useEffect(() => {
        function onKeyDown(event: KeyboardEvent) {
            if (event.key.toLowerCase() === 'k' && (event.metaKey || event.ctrlKey)) {
                event.preventDefault()
                ref.current?.focus()
            }
        }

        document.addEventListener('keydown', onKeyDown)
        return () => document.removeEventListener('keydown', onKeyDown)
    }, [ref])
}
