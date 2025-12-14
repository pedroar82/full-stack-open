const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3001/api/testing/reset')
    await request.post('http://localhost:3001/api/users', {
      data: {
        name: 'Acácio Cassiano',
        username: 'acac',
        password: 'pass'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
    await expect(page.getByText('Log in to application')).toBeVisible()
    await expect(page.getByLabel('username')).toBeVisible()
    await expect(page.getByLabel('password')).toBeVisible()
  })


   describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            await loginWith(page, 'acac', 'pass')
            await expect(page.getByText('Acácio Cassiano logged in')).toBeVisible()
        })

        test('fails with wrong credentials', async ({ page }) => {
            await loginWith(page, 'bogus', 'pass')
            await expect(page.getByText('wrong username or password')).toBeVisible()
        })
    })
})


  describe('When logged in', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('http://localhost:3001/api/testing/reset')
        await request.post('http://localhost:3001/api/users', {
            data: {
                name: 'Pedro Araújo',
                username: 'pedroar',
                password: 'pass'
            }
        })
         await page.goto('http://localhost:5173')    
        //log the user    
        await loginWith(page, 'pedroar', 'pass')
        await page.getByText('new blog').waitFor()
        await page.getByRole('button', { name: 'new blog' }).click()
    })

    test('a new blog can be created', async ({ page }) => {
        await createBlog(page, 'New Blog', 'Pedro', 'www')
        await expect(page.getByText('New Blog Pedro')).toBeVisible()
    })

    test('a new blog can be liked', async ({ page }) => {
        await createBlog(page, 'New Blog', 'Pedro', 'www')

        await page.getByRole('button', { name: 'view' }).click()
        
        await page.getByRole('button', { name: 'like' }).click()

        await expect(page.getByText('1')).toBeVisible()
    })

    test('user can delete a blog', async ({ page }) => {
        await createBlog(page, 'New Blog', 'Pedro', 'www')

        await page.getByRole('button', { name: 'view' }).click()
        
        await expect(page.getByText('delete')).toBeVisible()

        page.on('dialog', dialog => dialog.accept())
        await page.getByRole('button', { name: 'delete' }).click()
        await expect(page.getByText('New Blog Pedro')).not.toBeVisible()
    })

     test('user cannot delete the blog', async ({ page, request }) => {
        await createBlog(page, 'New Blog', 'Pedro', 'www')

        await page.getByRole('button', { name: 'logout' }).click()

        //log with a different user
        await request.post('http://localhost:3001/api/users', {
            data: {
                name: 'Acácio Cassiano',
                username: 'acac',
                password: 'pass'
            }
        })
        await loginWith(page, 'acac', 'pass')    

        await page.getByRole('button', { name: 'view' }).click() 
        await expect(page.getByRole('button', { name: 'delete' })).not.toBeVisible()
    })
    
    test('blog with the most likes first', async ({ page }) => {
        await createBlog(page, 'Full Stack', 'Pedro', 'www.full')
        await createBlog(page, 'AI perils', 'Manel', 'some url')
        
        //the blog form was updated with a test-id attribute
        //since the page is re-rendered and the blogs sorted by likes we cannot rely in the order
        const fullStackBlog = page
            .getByTestId('blog')
            .filter({ hasText: 'Full Stack Pedro' })

        const aiBlog = page
            .getByTestId('blog')
            .filter({ hasText: 'AI perils Manel' })

        await fullStackBlog.getByRole('button', { name: 'view' }).click()
        await fullStackBlog.getByRole('button', { name: 'like' }).click()
        await expect(fullStackBlog.getByTestId('likes')).toHaveText('1')

        await aiBlog.getByRole('button', { name: 'view' }).click()
        await aiBlog.getByRole('button', { name: 'like' }).click()
        await expect(aiBlog.getByTestId('likes')).toHaveText('1')

        await aiBlog.getByRole('button', { name: 'like' }).click()
        await expect(aiBlog.getByTestId('likes')).toHaveText('2')

        const blogs = page.getByTestId('blog')
        await expect(blogs.nth(0)).toContainText('AI perils Manel')
        await expect(blogs.nth(1)).toContainText('Full Stack Pedro')
    })
})