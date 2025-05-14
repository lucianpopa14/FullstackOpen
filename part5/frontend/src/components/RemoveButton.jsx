import blogService from '../services/blogs'

const RemoveButton = ({ blog, token, onUpdate }) => {
    const handleRemove = async () => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
            try {
                await blogService.deleteBlog(blog.id, token)
                await onUpdate()
            } catch (error) {
                console.error('Error removing blog:', error)
            }
        }
    }

    return (
        <button onClick={handleRemove}>
            remove
        </button>
    )
}

export default RemoveButton