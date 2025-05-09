import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

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
  const [notification, setNotification] = useState({
    message: null,
    type: null
  })

  const showNotification = (message, type) => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification({ message: null, type: null })
    }, 5000)
  }

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
      showNotification(`Welcome ${user.username}!`, 'success')
    } catch (exception) {
      showNotification('Wrong username or password', 'error')
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
      showNotification(`A new blog ${blogObject.title} by ${blogObject.author} added`, 'success')
    } catch (ex) {
      showNotification('Failed to create blog', 'error')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const refreshBLog = async () => {
    const updatedBlogs = await blogService.getAll()
    setBlogs(updatedBlogs)
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
      <Notification message={notification.message} type={notification.type} />
      <h2>Blogs</h2>
      {user.username} logged in
      <button onClick={handleLogout}>logout</button>
      <Togglable buttonLabel='create new blog'>
        <BlogForm
          title={formData.title}
          author={formData.author}
          url={formData.url}
          handleTitle={handleInputChange}
          handleAuthor={handleInputChange}
          handleUrl={handleInputChange}
          handleSubmit={handleBlogSubmit}
        />
      </Togglable>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog =>
          <Blog key={blog.id} blog={blog} onUpdate={refreshBLog}/>
      )}
    </div>
  )
}

export default App