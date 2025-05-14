import PropTypes from 'prop-types'

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
      <h2>Create new</h2>      <div>
        title:
        <input
          type='text'
          value={title}
          name='title'
          onChange={handleTitle}
          placeholder='write title here'
        />
      </div>
      <div>
        author:
        <input
          type='text'
          value={author}
          name='author'
          onChange={handleAuthor}
          placeholder='write author name here'
        />
      </div>
      <div>
        url:
        <input
          type="text"
          value={url}
          name='url'
          onChange={handleUrl}
          placeholder='write url here'
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

BlogForm.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  handleTitle: PropTypes.func.isRequired,
  handleAuthor: PropTypes.func.isRequired,
  handleUrl: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default BlogForm