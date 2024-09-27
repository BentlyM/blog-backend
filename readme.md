# Blog Post API

This API allows users to manage blog posts, comments, and user authentication. It supports two roles: Admin and User.

## Base URL
```
https://backend-uoiu.onrender.com/api/posts
```

## Authentication

### Register User
- **POST** `/users/register`
  - **Request Body**:
    ```json
    {
      "username": "string",
      "email": "string",
      "password": "string"
    }
    ```
  - **Response**:
    - 201 Created: User registered successfully.
    - 400 Bad Request: Validation errors.

### Login User
- **POST** `/users/login`
  - **Request Body**:
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```
  - **Response**:
    - 200 OK: Successful login, returns a JWT token.
    - 401 Unauthorized: Invalid credentials.

## User Routes

### Get All Users (Admin Only)
- **GET** `/users`
  - **Response**:
    - 200 OK: Returns an array of users.
    - 403 Forbidden: Access denied for non-admin users.

## Post Routes

### Create Post (Admin Only)
- **POST** `/posts`
  - **Request Body**:
    ```json
    {
      "title": "string",
      "content": "string",
      "published": "boolean"
    }
    ```
  - **Response**:
    - 201 Created: Post created successfully.
    - 403 Forbidden: Access denied for non-admin users.

### Get All Posts
- **GET** `/posts`
  - **Response**:
    - 200 OK: Returns an array of all posts.

### Get Post by ID
- **GET** `/posts/:id`
  - **Response**:
    - 200 OK: Returns the requested post.
    - 404 Not Found: Post does not exist.

### Update Post (Admin Only)
- **PUT** `/posts/:id`
  - **Request Body**:
    ```json
    {
      "title": "string",
      "content": "string",
      "published": "boolean"
    }
    ```
  - **Response**:
    - 200 OK: Post updated successfully.
    - 403 Forbidden: Access denied for non-admin users.
    - 404 Not Found: Post does not exist.

### Delete Post (Admin Only)
- **DELETE** `/posts/:id`
  - **Response**:
    - 204 No Content: Post deleted successfully.
    - 403 Forbidden: Access denied for non-admin users.
    - 404 Not Found: Post does not exist.

## Comment Routes

### Add Comment to Post
- **POST** `/posts/:postId/comments`
  - **Request Body**:
    ```json
    {
      "content": "string"
    }
    ```
  - **Response**:
    - 201 Created: Comment added successfully.
    - 404 Not Found: Post does not exist.

### Get Comments for a Post
- **GET** `/posts/:postId/comments`
  - **Response**:
    - 200 OK: Returns an array of comments for the specified post.
    - 404 Not Found: Post does not exist.

### Delete Comment (Admin Only)
- **DELETE** `/comments/:id`
  - **Response**:
    - 204 No Content: Comment deleted successfully.
    - 403 Forbidden: Access denied for non-admin users.
    - 404 Not Found: Comment does not exist.

## Error Handling
- The API will return appropriate HTTP status codes and error messages for all invalid requests or actions.
