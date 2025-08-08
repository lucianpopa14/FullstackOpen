import blogService from "../services/blogs";

const LikeButton = ({ blog, onUpdate }) => {
  const handleLike = async () => {
    const updatedBlog = {
      user: blog.user.id || blog.user._id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    };
    await blogService.addLikes(blog.id, updatedBlog);
    await onUpdate();
  };

  return <button onClick={handleLike}>like</button>;
};

export default LikeButton;
