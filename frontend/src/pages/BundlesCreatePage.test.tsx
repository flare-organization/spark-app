import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import BundlesCreatePage from '@/pages/BundlesCreatePage'
import { MemoryRouter } from 'react-router-dom'
import { expect } from 'vitest'

test('shows validation errors when submitting an empty form', async () => {
    render(
        <MemoryRouter>
            <BundlesCreatePage />
        </MemoryRouter>,
    )

    await userEvent.click(screen.getByRole('button', { name: /publish bundle/i }))

    expect(screen.getByText(/Bundle name is required./i)).toBeInTheDocument()
})
