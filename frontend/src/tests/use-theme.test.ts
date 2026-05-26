import { act, renderHook } from '@testing-library/react'
import { useTheme } from '@/hooks/use-theme'

beforeEach(() => {
  localStorage.clear()
  document.documentElement.className = ''
})

describe('useTheme', () => {
  it('defaults to latte when no theme is stored', () => {
    const { result } = renderHook(() => useTheme())
    expect(result.current.theme).toBe('latte')
  })

  it('reads the persisted theme from localStorage on mount', () => {
    localStorage.setItem('theme', 'mocha')
    const { result } = renderHook(() => useTheme())
    expect(result.current.theme).toBe('mocha')
  })

  it('persists the chosen theme and toggles the mocha class on <html>', () => {
    const { result } = renderHook(() => useTheme())

    act(() => {
      result.current.setTheme('mocha')
    })

    expect(localStorage.getItem('theme')).toBe('mocha')
    expect(document.documentElement.classList.contains('mocha')).toBe(true)
  })
})
