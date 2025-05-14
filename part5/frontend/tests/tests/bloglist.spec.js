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
    await request.post('http://localhost:3003/api/users', {
      username: 'anotheruser',
      name: 'Another User',
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

    test('a blog can be liked', async ({ page }) => {
      await page.getByRole('button', { name: 'create new blog' }).click()
      await page.getByPlaceholderText('write title here').fill('Likeable Blog')
      await page.getByPlaceholderText('write author name here').fill('Like Author')
      await page.getByPlaceholderText('write url here').fill('http://likeable.com')
      await page.getByRole('button', { name: 'create' }).click()

      await page.getByRole('button', { name: 'view' }).click()

      const likesElement = page.getByText('likes 0')
      await expect(likesElement).toBeVisible()

      await page.getByRole('button', { name: 'like' }).click()

      await expect(page.getByText('likes 1')).toBeVisible()
    })

    test('user can delete their own blog', async ({ page }) => {
      await page.getByRole('button', { name: 'create new blog' }).click()
      await page.getByPlaceholderText('write title here').fill('Blog to Delete')
      await page.getByPlaceholderText('write author name here').fill('Delete Author')
      await page.getByPlaceholderText('write url here').fill('http://delete-me.com')
      await page.getByRole('button', { name: 'create' }).click()

      page.on('dialog', async dialog => {
        expect(dialog.message()).toBe('Remove blog Blog to Delete by Delete Author?')
        await dialog.accept()
      })

      await page.getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'remove' }).click()

      await expect(page.getByText('Blog to Delete Delete Author')).not.toBeVisible()
    })

    test('only blog creator can see delete button', async ({ page }) => {
      await page.getByRole('button', { name: 'create new blog' }).click()
      await page.getByPlaceholderText('write title here').fill('Creator Only Blog')
      await page.getByPlaceholderText('write author name here').fill('Test Author')
      await page.getByPlaceholderText('write url here').fill('http://testblog.com')
      await page.getByRole('button', { name: 'create' }).click()

      await page.getByRole('button', { name: 'view' }).click()
      const removeButton = page.getByRole('button', { name: 'remove' })
      await expect(removeButton).toBeVisible()

      await page.getByRole('button', { name: 'logout' }).click()

      await page.getByLabel('username').fill('anotheruser')
      await page.getByLabel('password').fill('password123')
      await page.getByRole('button', { name: 'login' }).click()

      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
    })

    test('blogs are ordered by likes, most likes first', async ({ page }) => {
      await page.getByRole('button', { name: 'create new blog' }).click()
      await page.getByPlaceholderText('write title here').fill('First Blog')
      await page.getByPlaceholderText('write author name here').fill('First Author')
      await page.getByPlaceholderText('write url here').fill('http://first.com')
      await page.getByRole('button', { name: 'create' }).click()

      await page.getByRole('button', { name: 'create new blog' }).click()
      await page.getByPlaceholderText('write title here').fill('Second Blog')
      await page.getByPlaceholderText('write author name here').fill('Second Author')
      await page.getByPlaceholderText('write url here').fill('http://second.com')
      await page.getByRole('button', { name: 'create' }).click()

      await page.getByRole('button', { name: 'create new blog' }).click()
      await page.getByPlaceholderText('write title here').fill('Third Blog')
      await page.getByPlaceholderText('write author name here').fill('Third Author')
      await page.getByPlaceholderText('write url here').fill('http://third.com')
      await page.getByRole('button', { name: 'create' }).click()

      const viewButtons = await page.getByRole('button', { name: 'view' }).all()
      for (const button of viewButtons) {
        await button.click()
      }

      const secondBlogLikeButton = page.locator('div').filter({ hasText: 'Second Blog Second Author' }).getByRole('button', { name: 'like' })
      const thirdBlogLikeButton = page.locator('div').filter({ hasText: 'Third Blog Third Author' }).getByRole('button', { name: 'like' })

      await secondBlogLikeButton.click()
      await secondBlogLikeButton.click()

      await thirdBlogLikeButton.click()
      await thirdBlogLikeButton.click()
      await thirdBlogLikeButton.click()
      await thirdBlogLikeButton.click()

      const blogs = await page.locator('.blog-details').all()
      
      const firstBlogText = await blogs[0].textContent()
      const secondBlogText = await blogs[1].textContent()
      const thirdBlogText = await blogs[2].textContent()

      expect(firstBlogText).toContain('Third Blog')
      expect(firstBlogText).toContain('likes 4')
      
      expect(secondBlogText).toContain('Second Blog')
      expect(secondBlogText).toContain('likes 2')
      
      expect(thirdBlogText).toContain('First Blog')
      expect(thirdBlogText).toContain('likes 0')
    })
  })
})