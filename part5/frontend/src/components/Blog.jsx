import { useState } from 'react'
import LikeButton from './LikeButton'
import RemoveButton from './RemoveButton'

const Blog = ({ blog, user, onUpdate }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [visible, setVisible] = useState(false)
  const titleOnlyVisible = { display: visible ? 'none' : '' }
  const detailsVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={{ ...detailsVisible, ...blogStyle }} className="blog-details">
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>hide</button>
        <div>
          <div className="blog-url">{blog.url}</div>
          <div className="blog-likes">
            likes {blog.likes}
            <LikeButton blog={blog} onUpdate={onUpdate} />
          </div>
          {blog.user.name}
          {blog.user.username === user.username && (<RemoveButton blog={blog} token={user.token} onUpdate={onUpdate} />)}
        </div>
      </div>
      <div style={{ ...titleOnlyVisible, ...blogStyle }} data-testid="blog-title">
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>view</button>
      </div>
    </div>
  )
}

export default Blog