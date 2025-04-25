const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user')


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({});
    response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
    const body = request.body;
    const user = await User.findById(body.userId);

    if (!user) {
        return response.status(400).json({ error: 'user not found' });
    }

    const blog = new Blog({
        ...body,
        user: user._id
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    response.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body;
    const updatedBlog = await Blog.findByIdAndUpdate(
        request.params.id, 
        { likes: body.likes },
        { new: true }
    );
    response.json(updatedBlog);
});

module.exports = blogsRouter;