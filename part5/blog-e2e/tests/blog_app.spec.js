const { test, expect, beforeEach, describe } = require('@playwright/test')

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
            await page.getByLabel('username').fill('acac')    
            await page.getByLabel('password').fill('pass')
            await page.getByRole('button', { name: 'login' }).click() 
            await expect(page.getByText('Acácio Cassiano logged in')).toBeVisible()
        })

        test('fails with wrong credentials', async ({ page }) => {
            await page.getByLabel('username').fill('bogus')    
            await page.getByLabel('password').fill('pass')
            await page.getByRole('button', { name: 'login' }).click() 
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
        await page.getByLabel('username').fill('pedroar')    
        await page.getByLabel('password').fill('pass')
        await page.getByRole('button', { name: 'login' }).click()     
    })

    test('a new blog can be created', async ({ page }) => {
        await page.getByRole('button', { name: 'new blog' }).click()
        
        await page.fill('#title', 'New Blog')
        await page.fill('#author', 'Pedro')
        await page.fill('#url', 'www.example.pt')

        await page.getByRole('button', { name: 'create' }).click()

        await expect(page.getByText('New Blog Pedro')).toBeVisible()
    })

    test('a new blog can be liked', async ({ page }) => {
        await page.getByRole('button', { name: 'new blog' }).click()
        
        await page.fill('#title', 'New Blog')
        await page.fill('#author', 'Pedro')
        await page.fill('#url', 'www.example.pt')

        await page.getByRole('button', { name: 'create' }).click()

        await page.getByRole('button', { name: 'view' }).click()
        
        await page.getByRole('button', { name: 'like' }).click()

        await expect(page.getByText('1')).toBeVisible()
    })

    test('user can delete a blog', async ({ page }) => {
        await page.getByRole('button', { name: 'new blog' }).click()
        
        await page.fill('#title', 'New Blog')
        await page.fill('#author', 'Pedro')
        await page.fill('#url', 'www.example.pt')

        await page.getByRole('button', { name: 'create' }).click()

        await page.getByRole('button', { name: 'view' }).click()
        
        await expect(page.getByText('delete')).toBeVisible()

        page.on('dialog', dialog => dialog.accept())
        await page.getByRole('button', { name: 'delete' }).click()
        await expect(page.getByText('New Blog Pedro')).not.toBeVisible()
    })

     test('user cannot delete the blog', async ({ page, request }) => {
        await page.getByRole('button', { name: 'new blog' }).click()
        
        await page.fill('#title', 'New Blog')
        await page.fill('#author', 'Pedro')
        await page.fill('#url', 'www.example.pt')

        await page.getByRole('button', { name: 'create' }).click()

        await page.getByRole('button', { name: 'logout' }).click()

        //log with a different user
        await request.post('http://localhost:3001/api/users', {
            data: {
                name: 'Acácio Cassiano',
                username: 'acac',
                password: 'pass'
            }
        })

        await page.getByLabel('username').fill('acac')    
        await page.getByLabel('password').fill('pass')
        await page.getByRole('button', { name: 'login' }).click()    
        await page.getByRole('button', { name: 'view' }).click() 
        await expect(page.getByRole('button', { name: 'delete' })).not.toBeVisible()
    })
    
})