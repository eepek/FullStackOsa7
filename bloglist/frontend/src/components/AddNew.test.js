import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import AddNew from "./AddNew"

test("Form sends correct information to handler function", async () => {
  const expectedBlog = {
    title: "Test Title",
    author: "Testy Author",
    url: "www.internet.com",
  }

  const user = userEvent.setup()
  const newBlog = jest.fn()

  render(<AddNew createBlogEntry={newBlog} />)

  const title = screen.getByPlaceholderText("title")
  const author = screen.getByPlaceholderText("author")
  const url = screen.getByPlaceholderText("url")
  const submitButton = screen.getByText("Submit")

  await user.type(title, expectedBlog.title)
  await user.type(author, expectedBlog.author)
  await user.type(url, expectedBlog.url)

  await user.click(submitButton)

  expect(newBlog.mock.calls[0][0]).toEqual(expectedBlog)
})
