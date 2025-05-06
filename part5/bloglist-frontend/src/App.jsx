import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    title: '',
    author: '',
    url: ''
  })
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    if (user) {
      fetchBlogs()
    }
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: formData.username,
        password: formData.password,
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUser(user)
      setFormData(prev => ({
        ...prev,
        username: '',
        password: ''
      }))
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleBlogSubmit = async (event) => {
    event.preventDefault()
    try {
      const blogObject = {
        title: formData.title,
        author: formData.author,
        url: formData.url
      }
      await blogService.newBlog(blogObject, user.token)
      setFormData(prev => ({
        ...prev,
        title: '',
        author: '',
        url: ''
      }))
      const updatedBlogs = await blogService.getAll()
      setBlogs(updatedBlogs)
    } catch (ex) {
      setErrorMessage('Failed to create blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  if (!user) {
    return (
      <LoginForm
        username={formData.username}
        password={formData.password}
        handleUsername={handleInputChange}
        handlePassword={handleInputChange}
        handleSubmit={handleLogin}
      />
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>{user.username} logged in</p>
      <button onClick={handleLogout}>logout</button>

      <BlogForm
        title={formData.title}
        author={formData.author}
        url={formData.url}
        handleTitle={handleInputChange}
        handleAuthor={handleInputChange}
        handleUrl={handleInputChange}
        handleSubmit={handleBlogSubmit}
      />

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App