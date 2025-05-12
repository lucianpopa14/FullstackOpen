import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders blog title and author but not url or likes by default', () => {
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

  render(<Blog blog={blog} user={user} onUpdate={() => { }} />)

  const titleDiv = screen.getByTestId('blog-title')
  expect(titleDiv).toHaveTextContent(`${blog.title} ${blog.author}`)
  expect(titleDiv).toBeVisible()

  const urlText = screen.queryByText(blog.url)
  expect(urlText).not.toBeVisible()

  const likesText = screen.queryByText(`likes ${blog.likes}`)
  expect(likesText).not.toBeVisible()
})

test('blog url and likes are shown when the view button is clicked', async () => {
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
  
  const user2 = userEvent.setup()
  const button = screen.getByText('view')
  await user2.click(button)

  const urlElement = screen.getByText(blog.url)
  expect(urlElement).toBeVisible()

  const likesElement = screen.getByText(`likes ${blog.likes}`)
  expect(likesElement).toBeVisible()
})
