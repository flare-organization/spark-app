import { render, screen } from '@testing-library/react'
import { test, expect } from 'vitest'
import App from '@/App'

test('it renders the app with hello world text', () => {
    render(<App />)

    expect(screen.getByText('Hello world!')).toBeInTheDocument()
})
