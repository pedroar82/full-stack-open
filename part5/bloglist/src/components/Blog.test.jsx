import { render } from '@testing-library/react'
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