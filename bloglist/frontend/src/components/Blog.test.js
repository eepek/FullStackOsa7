import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Blog from "./Blog"

const blog = {
  title: "Testing can be very difficult",
  author: "Every student",
  url: "www",
  likes: 0,
  user: { username: "apowers", name: "austin powers" },
}

test("Renders blog title and author correctly", () => {
  render(
    <Blog
      blog={blog}
      likeHandler={() => {}}
      removeHandler={() => {}}
      userName="apowers"
    />,
  )

  screen.getByText("Testing can be very difficult Every student")
})

test("Clicking button provides all the info", async () => {
  const user = userEvent.setup()

  render(
    <Blog
      blog={blog}
      likeHandler={() => {}}
      removeHandler={() => {}}
      userName="apowers"
    />,
  )

  const button = screen.getByText("view")
  await user.click(button)
  screen.getByText("URL:")
  //Testataan että linkki tulee myös näkyviin ja lisäksi url tulee oikein <a> tagin sisään
  const url = screen.getByText("www").closest("a")
  screen.getByText("Likes: 0")
  screen.getByText("Added by: austin powers")
  expect(url).toHaveAttribute("href", "www")
})

test("Like button increases eventholder like amount", async () => {
  const user = userEvent.setup()
  const likeEvents = jest.fn()

  render(
    <Blog
      blog={blog}
      likeHandler={likeEvents}
      removeHandler={() => {}}
      userName="apowers"
    />,
  )

  //Avataan koko näkymä
  const button = screen.getByText("view")
  await user.click(button)

  const likeButton = screen.getByText("like")
  await user.click(likeButton)
  await user.click(likeButton)

  expect(likeEvents.mock.calls).toHaveLength(2)
})
