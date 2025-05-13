const { test, expect, beforeEach, describe } = require('@playwright/test')
const { default: axios } = require('axios')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      username: 'testuser',
      name: 'Test User',
      password: 'password123'
    })
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const loginForm = await page.getByRole('form')
    const usernameInput = await page.getByLabel('username')
    const passwordInput = await page.getByLabel('password')
    const loginButton = await page.getByRole('button', { name: 'login' })

    await expect(loginForm).toBeVisible()
    await expect(usernameInput).toBeVisible()
    await expect(passwordInput).toBeVisible()
    await expect(loginButton).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByLabel('username').fill('testuser')
      await page.getByLabel('password').fill('password123')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('testuser logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByLabel('username').fill('testuser')
      await page.getByLabel('password').fill('wrong')
      await page.getByRole('button', { name: 'login' }).click()

      const errorDiv = page.getByText('Wrong username or password')
      await expect(errorDiv).toBeVisible()
      await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')

      await expect(page.getByText('testuser logged in')).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByLabel('username').fill('testuser')
      await page.getByLabel('password').fill('password123')
      await page.getByRole('button', { name: 'login' }).click()
      
      await expect(page.getByText('testuser logged in')).toBeVisible()
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'create new blog' }).click()

      await page.getByPlaceholderText('write title here').fill('Test Blog Title')
      await page.getByPlaceholderText('write author name here').fill('Test Author')
      await page.getByPlaceholderText('write url here').fill('http://testblog.com')
      await page.getByRole('button', { name: 'create' }).click()

      await expect(page.getByText('A new blog Test Blog Title by Test Author added')).toBeVisible()

      const blogEntry = page.getByText('Test Blog Title Test Author')
      await expect(blogEntry).toBeVisible()

      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.getByText('http://testblog.com')).toBeVisible()
      await expect(page.getByText('likes 0')).toBeVisible()
      await expect(page.getByText('Test User')).toBeVisible()
    })
  })
})