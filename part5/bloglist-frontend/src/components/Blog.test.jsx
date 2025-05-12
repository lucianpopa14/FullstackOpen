import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders blog title and author', () => {
  const blog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'https://testurl.com',
    likes: 5,
    user: {
      name: 'Test User',
      username: 'testuser'
    }
  }

  const user = {
    username: 'testuser',
    token: 'testtoken'
  }

  render(<Blog blog={blog} user={user} onUpdate={() => {}} />)
  
  expect(screen.getByText(`${blog.title} ${blog.author}`)).toBeInTheDocument()
})
