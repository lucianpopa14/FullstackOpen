const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/listHelper')

test('dummy test', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})