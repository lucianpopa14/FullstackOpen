import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import Blog from "./Blog";
import blogService from "../services/blogs";

test("renders blog title and author but not url or likes by default", () => {
  const blog = {
    title: "Test Blog",
    author: "Test Author",
    url: "https://testurl.com",
    likes: 5,
    user: {
      name: "Test User",
      username: "testuser",
    },
  };

  const user = {
    username: "testuser",
    token: "testtoken",
  };

  render(<Blog blog={blog} user={user} onUpdate={() => {}} />);

  const titleDiv = screen.getByTestId("blog-title");
  expect(titleDiv).toHaveTextContent(`${blog.title} ${blog.author}`);
  expect(titleDiv).toBeVisible();

  const urlText = screen.queryByText(blog.url);
  expect(urlText).not.toBeVisible();

  const likesText = screen.queryByText(`likes ${blog.likes}`);
  expect(likesText).not.toBeVisible();
});

test("blog url and likes are shown when the view button is clicked", async () => {
  const blog = {
    title: "Test Blog",
    author: "Test Author",
    url: "https://testurl.com",
    likes: 5,
    user: {
      name: "Test User",
      username: "testuser",
    },
  };

  const user = {
    username: "testuser",
    token: "testtoken",
  };

  render(<Blog blog={blog} user={user} onUpdate={() => {}} />);

  const user2 = userEvent.setup();
  const button = screen.getByText("view");
  await user2.click(button);

  const urlElement = screen.getByText(blog.url);
  expect(urlElement).toBeVisible();

  const likesElement = screen.getByText(`likes ${blog.likes}`);
  expect(likesElement).toBeVisible();
});

test("if like button is clicked twice, event handler is called twice", async () => {
  const blog = {
    title: "Test Blog",
    author: "Test Author",
    url: "https://testurl.com",
    likes: 5,
    user: {
      name: "Test User",
      username: "testuser",
      id: "123", // Add an id to avoid undefined id
    },
  };

  const user = {
    username: "testuser",
    token: "testtoken",
  };

  const mockUpdate = vi.fn();
  const mockAddLikes = vi.fn();

  vi.spyOn(blogService, "addLikes").mockImplementation(mockAddLikes);

  render(<Blog blog={blog} user={user} onUpdate={mockUpdate} />);

  const user2 = userEvent.setup();

  const viewButton = screen.getByText("view");
  await user2.click(viewButton);

  const likeButton = screen.getByText("like");
  await user2.click(likeButton);
  await user2.click(likeButton);

  expect(mockAddLikes.mock.calls).toHaveLength(2);
  expect(mockUpdate.mock.calls).toHaveLength(2);
});
