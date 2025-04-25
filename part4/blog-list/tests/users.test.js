const supertest = require('supertest')
const { test, beforeEach } = require('node:test')
const assert = require('node:assert')
const app = require('../app')
const User = require('../models/user')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')

const api = supertest(app)

beforeEach(async () => {    
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })
    await user.save()
})

test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
        username: 'testuser',
        name: 'Test User',
        password: 'password123',
    }

    await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)
        
    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)
    assert.ok(usersAtEnd.map(u => u.username).includes(newUser.username))
})

test('get all users returns json', async () => {
    await api
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('creation fails if username already exists', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
        username: 'root',
        name: 'Superuser',
        password: 'password123',
    }

    const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

    assert.strictEqual(result.body.error, 'username must be unique')
    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
})