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