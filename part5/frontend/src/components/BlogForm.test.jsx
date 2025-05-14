import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, test, expect, vi } from 'vitest'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
    test('calls event handler with correct details when new blog is created', async () => {
        const handleSubmit = vi.fn()
        const handleTitle = vi.fn()
        const handleAuthor = vi.fn()
        const handleUrl = vi.fn()

        render(
            <BlogForm
                title=""
                author=""
                url=""
                handleSubmit={handleSubmit}
                handleTitle={handleTitle}
                handleAuthor={handleAuthor}
                handleUrl={handleUrl}
            />
        )

        const user = userEvent.setup()
        const titleInput = screen.getByPlaceholderText('write title here')
        const authorInput = screen.getByPlaceholderText('write author name here')
        const urlInput = screen.getByPlaceholderText('write url here')
        const submitButton = screen.getByText('create')

        await user.type(titleInput, 'Test Title')
        await user.type(authorInput, 'Test Author')
        await user.type(urlInput, 'http://test.com')
        await user.click(submitButton)

        expect(handleTitle).toHaveBeenCalled()
        expect(handleAuthor).toHaveBeenCalled()
        expect(handleUrl).toHaveBeenCalled()
        expect(handleSubmit).toHaveBeenCalled()
    })
})