import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithRouter } from '@/tests/test-utils/render'
import HomePage from '@/pages/HomePage'

beforeEach(() => {
  localStorage.clear()
  document.documentElement.className = ''
})

describe('HomePage', () => {
  it('renders the heading and a link to /about', () => {
    renderWithRouter(<HomePage />)

    expect(screen.getByRole('heading', { name: /home/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /go to about/i })).toHaveAttribute('href', '/about')
  })

  it('switches to mocha when the Mocha button is clicked', async () => {
    const user = userEvent.setup()
    renderWithRouter(<HomePage />)

    await user.click(screen.getByRole('button', { name: /mocha/i }))

    expect(localStorage.getItem('theme')).toBe('mocha')
    expect(document.documentElement.classList.contains('mocha')).toBe(true)
  })
})
