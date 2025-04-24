const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const Blog = require('../models/blog')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const initialBlogs = [
    {
        "title": "React patterns",
        "author": "Michael Chan",
        "url": "https://reactpatterns.com/",
        "likes": 7
    },
    {
        "title": "Go To Statement Considered Harmful",
        "author": "Edsger W. Dijkstra",
        "url": "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        "likes": 5
    }
]
beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('there are 2 blogs', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, initialBlogs.length)
})

test('blogs entries have an id field and not _id', async () => {
    const response = await api.get('/api/blogs')
    const blog = response.body[0]
    assert.strictEqual('id' in blog, true)
    assert.strictEqual('_id' in blog, false)
})

test('post request creates new blog post', async () => {
    const newBlog = {
        "title": "test blog",
        "author": "tesy test",
        "url": "https://test.com/",
        "likes": 4
    }
    const request = await api.post('/api/blogs').send(newBlog).expect(201)
    const response = await api.get('/api/blogs')
    assert.strictEqual(request.body.title, newBlog.title)
    assert.strictEqual(response.body.length, 3)
})

after(async () => {
    await mongoose.connection.close()
})