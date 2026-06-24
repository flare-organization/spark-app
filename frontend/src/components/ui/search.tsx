import { type SubmitEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search as SearchIcon } from 'lucide-react'

import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'

type SearchProps = {
    value: string
    onValueChange: (value: string) => void
    className?: string
}

function Search({ value, onValueChange, className }: SearchProps) {
    const navigate = useNavigate()

    function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault()
        navigate(`/bundles?q=${value}`)
    }

    return (
        <form onSubmit={handleSubmit} role="search" className={className}>
            <InputGroup>
                <InputGroupAddon>
                    <SearchIcon />
                </InputGroupAddon>
                <InputGroupInput
                    type="search"
                    placeholder="Search bundles..."
                    value={value}
                    onChange={(event) => onValueChange(event.target.value)}
                />
            </InputGroup>
        </form>
    )
}

export { Search }
