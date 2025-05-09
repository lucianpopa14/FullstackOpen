import { useState } from "react"
import LikeButton from "./LikeButton"
import blogService from '../services/blogs'

const Blog = ({ blog, onUpdate }) => {
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
      <div style={{ ...detailsVisible, ...blogStyle }}>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>hide</button>
        <div>
          {blog.url}
          <div>
            likes {blog.likes}
            <LikeButton blog={blog} onUpdate={onUpdate} />
          </div>
          {blog.user.name}
        </div>
      </div>
      <div style={{ ...titleOnlyVisible, ...blogStyle }}>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>view</button>
      </div>
    </div>
  )
}

export default Blog