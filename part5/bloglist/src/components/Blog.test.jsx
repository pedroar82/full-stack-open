import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Blog title',
    author: 'Author',
    url: 'wwww',
    likes: 5,
    user: { id: '11', name: 'Acácio' }
  }

  const { container } = render(<Blog blog={blog} />)

  const title = container.querySelector('.blogStyle')
  expect(title).toHaveTextContent('Blog title')
  expect(title).toHaveTextContent('Author')

  const detail = container.querySelector('.showWhenVisible')
  expect(detail).not.toBeVisible()
})


test('url and likes displayed', async () => {
  const blog = {
    title: 'Blog title',
    author: 'Author',
    url: 'wwww',
    likes: 5,
    user: { id: '11', name: 'Acácio' }
  }

  const { container } = render(<Blog blog={blog} />)

  const user = userEvent.setup()

  const button = screen.getByText('view')
  await user.click(button)

  const detailDiv = container.querySelector('.showWhenVisible')

  expect(detailDiv).toHaveTextContent('wwww')
  expect(detailDiv).toHaveTextContent('5')
})