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

// test('shows validation errors when input exceeds max length', async () => {
//     const user = userEvent.setup();
//
//     render(
//         <MemoryRouter>
//             <BundlesCreatePage />
//         </MemoryRouter>
//     )
//
//     await user.type(
//         screen.getByRole("textbox", {name: /name/i}),
//         "a".repeat(129)
//     )
//
//     await user.type(
//         screen.getByRole("textbox", {name: /description/i}),
//         "a".repeat(513)
//     )
//
//     await user.click(
//         screen.getByRole("button", {name: /publish bundle/i})
//     )
//
//     expect(screen.getByText(/Bundle name must be 128 characters or fewer./i)).toBeInTheDocument()
//     expect(screen.getByText(/Description must be 512 characters or fewer./i)).toBeInTheDocument()
// })
