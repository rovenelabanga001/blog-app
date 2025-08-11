# Blog Application

This is a frontend-only blog web application built using Vue.js for the user interface and JSON-server as a lightweight mock backend. The application allows users to browse, create, edit, and delete blog posts, simulating the behavior of a fully functional blog platform without requiring a real backend service.

By leveraging Vue.js, the project takes advantage of reactive data binding, component-based architecture, and efficient state management to provide a smooth, dynamic user experience. The JSON-server acts as a local RESTful API, serving mock blog data and handling basic CRUD (Create, Read, Update, Delete) operations for development and testing purposes.

## Features

- User authentication
- Displaying a list of blog posts with titles, content previews, and publication dates
- Viewing individual blog post details on a dedicated page
- Creating new blog posts with a user-friendly form
- Editing and deleting existing posts
- Creating new comments on other blogs
- Deleting individual comments
- Live updates without page reloads using Vue’s reactivity system
- A fully mocked API powered by JSON-server for quick local development

## Installation

Install my-project with npm

### 1. Clone the project from github

```bash
  git clone git@github.com:rovenelabanga001/blog-app.git
```

### 2. Navigate to the project folder

```bash
   cd blog-app
```

### 3. Install and use nvm

```
    nvm install 20
    nvm use 20
```

### 4. Install project dependencies

```
    npm install
```

### 5. Run JSON-server

```
    npm run server
```

### 6. Run the project

```
    npm run dev
```
