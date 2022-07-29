
import { render, screen } from '@testing-library/react'

import Home from '@/pages/index'

describe('Home', () => {
  it('renders the heading', () => {
    render(<Home />)

    const heading = screen.getByRole('heading', {
      name: /nerdou/i,
    })

    expect(heading).toBeInTheDocument()
  })
})
