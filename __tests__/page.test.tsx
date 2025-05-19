import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Page from '@/pages/index'
 
describe('Page', () => {
  it('renders a heading and a link', () => {
    render(<Page />)

    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()

    // Check for the "START FILLING FORM" link text
    expect(screen.getByText('START FILLING FORM')).toBeInTheDocument()
  })
})