const Blog = require('../models/blog');


const dummy = (blogs) => {
    blogs = Blog.find({});
    return 1;
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0);
}

module.exports = {
    dummy, totalLikes
}