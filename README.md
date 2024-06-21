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

## auth.js

This code defines a class called `AuthService` that handles authentication-related functionality.
It imports the `conf` object from "../conf/conf.js" and the `Client`, `Account`, and `ID` classes from the "appwrite" package.

The `AuthService` class has the following methods:

- `constructor()`: Initializes the `Client` and `Account` instances with the endpoint and project ID from the `conf` object.

- `createAccount({ email, password, name })`: Creates a new user account by calling the `create` method of the `Account` instance.
  It generates a unique ID using `ID.unique()`, and passes the email, password, and name as arguments.
  If the user account is successfully created, it calls the `login` method to log in the user.

- `login({ email, password })`: Logs in the user by calling the `createEmailPasswordSession` method of the `Account` instance.
  It takes the email and password as arguments and returns the session information.

- `getCurrentUser()`: Retrieves the current user by calling the `get` method of the `Account` instance.
  It returns the user object if successful, otherwise logs the error to the console.

The `AuthService` class also creates an instance of itself called `authService` and exports it as the default export.

Note: The code assumes that the `conf` object contains the necessary configuration values for the appwrite service, such as the URL and project ID.

```
import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(), // Generate a unique ID
        email,
        password,
        name
      );
      if (!userAccount) { // If the user is not created
        return userAccount;
      }
      //Call another method
      return this.login({email, password}) // Login the user
    } catch (error) {
      throw error;
    }
  }


  async login({email, password}) {
    try {
        return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
        throw error;
    }
  }

  async getCurrentUser() {
    try {
        return await this.account.get(); // Get the current user
        
    } catch (error) {
        console.log("Appwrite service :: getCurrentUser :: error ", error)
    }
  }


}

const authService = new AuthService();

export default authService;


```
# Service Class

The `Service` class is responsible for handling database and storage operations using the Appwrite backend-as-a-service platform. It provides methods for creating, updating, deleting, and reading posts, as well as uploading and deleting files.

## Constructor

The constructor initializes the `Client` instance and sets the endpoint and project ID using the `conf` object. It also initializes the `Databases` and `Storage` services.

```javascript
constructor() {
    this.client = new Client();
    this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
}
```

## createPost Method

The `createPost` method creates a new post document in the specified database collection. It takes an object containing the post details as its parameter and returns the created document.

```javascript
async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
        return await this.databases.createDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug,
            {
                title,
                slug,
                content,
                featuredImage,
                status,
                userId,
            }
        );
    } catch (error) {
        console.log("Service :: createPost :: error ", error);
    }
}
```

## updatePost Method

The `updatePost` method updates an existing post document in the specified database collection. It takes an object containing the updated post details as its parameter and returns the updated document.

```javascript
async updatePost({ title, slug, content, featuredImage, status, userId }) {
    try {
        return await this.databases.updateDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug,
            {
                title,
                slug,
                content,
                featuredImage,
                status,
                userId,
            }
        );
    } catch (error) {
        console.log("Service :: updatePost :: error ", error);
    }
}
```

## deletePost Method

The `deletePost` method deletes a post document from the specified database collection. It takes the slug of the post as its parameter and returns `true` if the deletion is successful, otherwise `false`.

```javascript
async deletePost(slug) {
    try {
        await this.databases.deleteDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug
        );
        return true;
    } catch (error) {
        console.log("Service :: deletePost :: error ", error);
        return false;
    }
}
```

## readPost Method

The `readPost` method retrieves a post document from the specified database collection. It takes the slug of the post as its parameter and returns the retrieved document.

```javascript
async readPost(slug) {
    try {
        return await this.databases.getDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug
        );
    } catch (error) {
        console.log("Service :: readPost :: error ", error);
    }
}
```

## getPosts Method

The `getPosts` method retrieves a list of post documents from the specified database collection based on the provided queries. It takes an optional array of queries as its parameter and returns the list of documents.

```javascript
async getPosts(queries = [Query.equal("status", "active")]) {
    try {
        return await this.databases.listDocuments(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            queries
        );
    } catch (error) {
        console.log("Service :: getAllPosts :: error ", error);
    }
}
```

## fileUpload Method

The `fileUpload` method uploads a file to the specified storage bucket. It takes the file object as its parameter and returns `true` if the upload is successful, otherwise `false`.

```javascript
async fileUpload(file) {
    try {
        await this.bucket.createFile(conf.appwriteBucketId, ID.unique(), file);
        return true;
    } catch (error) {
        console.log("Service :: fileUpload :: error ", error);
        return false;
    }
}
```

## deleteFile Method

The `deleteFile` method deletes a file from the specified storage bucket. It takes the file ID as its parameter and returns `true` if the deletion is successful, otherwise `false`.

```javascript
async deleteFile(fileId) {
    try {
        await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
        return true;
    } catch (error) {
        console.log("Service :: deleteFile :: error ", error);
        return false;
    }
}
```

## getFilePreview Method

The `getFilePreview` method retrieves the preview of a file from the specified storage bucket. It takes the file ID as its parameter and returns the file preview.

```javascript
async getFilePreview(fileId) {
    try {
        return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
    } catch (error) {
        console.log("Service :: getFilePreview :: error ", error);
    }
}
```

## Usage

To use the `Service` class, create an instance of it and export it as the default export.

```javascript
const service = new Service();
export default service;
```

