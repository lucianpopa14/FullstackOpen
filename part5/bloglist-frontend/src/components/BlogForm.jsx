const BlogForm = ({ 
  title, 
  author, 
  url, 
  handleTitle, 
  handleAuthor, 
  handleUrl, 
  handleSubmit 
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <h2>Create new</h2>
      <div>
        title:
        <input
          type='text'
          value={title}
          name='title'
          onChange={handleTitle}
        />
      </div>
      <div>
        author:
        <input
          type='text'
          value={author}
          name='author'
          onChange={handleAuthor}
        />
      </div>
      <div>
        url:
        <input
          type="text"
          value={url}
          name='url'
          onChange={handleUrl}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm