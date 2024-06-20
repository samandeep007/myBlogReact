# My Blog App

## Introduction

Welcome to My Blog App! This is a web application built using React, a popular JavaScript library for building user interfaces. With My Blog App, you can create and manage your own blog, write articles, and share your thoughts with the world.

## How to handle .env files in vite

When working with Vite, it is recommended to include the prefix `VITE_` while declaring environment variables. This is because Vite uses a different approach to handle environment variables compared to traditional bundlers like webpack.

By including the `VITE_` prefix, Vite can automatically expose these variables to your application at build time. This means that you can access these variables directly in your code using `import.meta.env`. For example, if you have a variable named `API_KEY` declared in your `.env` file, you can access it in your code like this: `import.meta.env.VITE_API_KEY`.

Using `import.meta.env` provides a convenient way to access environment variables without the need for additional configuration or dependencies. It also ensures that your environment variables are properly bundled and optimized during the build process.

Remember to keep your `.env` file secure and avoid committing it to version control systems. Instead, use a `.env.local` file for local development and provide environment-specific variables through your deployment process.


Here are the dependencies I have used for this project:

- **@reduxjs/toolkit**: Redux Toolkit is a package that simplifies the usage of Redux by providing a set of tools and utilities. It helps you write Redux logic in a more efficient and concise way. To install, run `npm install @reduxjs/toolkit`. You can find the official documentation [here](https://redux-toolkit.js.org/).

- **@tinymce/tinymce-react**: TinyMCE React is a wrapper around the TinyMCE editor, which is a powerful WYSIWYG editor for web applications. It allows you to easily integrate a rich text editor into your React application. To install, run `npm install @tinymce/tinymce-react`. You can find the official documentation [here](https://www.tiny.cloud/docs/integrations/react/).

- **appwrite**: Appwrite is a backend-as-a-service platform that provides various features and services for building web and mobile applications. It offers authentication, database, storage, and more. To install, run `npm install appwrite`. You can find the official documentation [here](https://appwrite.io/docs).

- **html-react-parser**: html-react-parser is a library that allows you to parse and render HTML strings as React components. It provides an easy way to convert HTML content into React components. To install, run `npm install html-react-parser`. You can find the official documentation [here](https://www.npmjs.com/package/html-react-parser).

- **react-hook-form**: React Hook Form is a library for building forms in React. It provides a simple and intuitive API for managing form state and validation. To install, run `npm install react-hook-form`. You can find the official documentation [here](https://react-hook-form.com/).

- **react-redux**: React Redux is the official Redux binding for React. It allows you to connect your React components to the Redux store and access the state and dispatch actions. To install, run `npm install react-redux`. You can find the official documentation [here](https://react-redux.js.org/).

- **react-router-dom**: React Router DOM is a library that provides routing capabilities for React applications. It allows you to define routes and navigate between different views in your application. To install, run `npm install react-router-dom`. You can find the official documentation [here](https://reactrouter.com/web/guides/quick-start).
