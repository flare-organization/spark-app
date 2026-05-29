import { type ReactElement } from 'react'
import { render, type RenderOptions } from '@testing-library/react'
import { MemoryRouter, type MemoryRouterProps } from 'react-router-dom'

type Options = Omit<RenderOptions, 'wrapper'> & {
  routerProps?: MemoryRouterProps
}

export function renderWithRouter(component: ReactElement, options: Options = {}) {
  const { routerProps, ...rest } = options
  return render(component, {
    wrapper: ({ children }) => <MemoryRouter {...routerProps}>{children}</MemoryRouter>,
    ...rest,
  })
}
