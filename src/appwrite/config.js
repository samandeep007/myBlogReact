import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases; // Database service
  bucket; // Storage service

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl) // Set the endpoint
      .setProject(conf.appwriteProjectId); // Set the project ID

    this.databases = new Databases(this.client); // Initialize the database service
    this.bucket = new Storage(this.client); // Initialize the storage service
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId
        }

        //Databases.createDocument([Database ID], [Collection ID], [Data], [Read Permissions], [Write Permissions])
      );
    } catch (error) {
      console.log("Service :: createPost :: error ", error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status}) {
    try {
      return this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status
        }

        //Databases.updateDocument([Database ID], [Collection ID], [Document ID], [Data], [Read Permissions], [Write Permissions])
      );
    } catch (error) {
      console.log("Service :: updatePost :: error ", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug

        //Databases.deleteDocument([Database ID], [Collection ID], [Document ID]
      );
      return true;
    } catch (error) {
      console.log("Service :: deletePost :: error ", error);
      return false;
    }
  }

  async getPost(slug) {
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

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );

      /*  databases.listDocuments(
            '<DATABASE_ID>', // databaseId
            '<COLLECTION_ID>', // collectionId
            [] // queries (optional)
          );
      */
    } catch (error) {
      console.log("Service :: getAllPosts :: error ", error);
    }
  }

  //file Upload service
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(conf.appwriteBucketId, ID.unique(), file);
      
    } catch (error) {
      console.log("Service :: fileUpload :: error ", error);
      return false;
    }
  }

  async deleteFile(fileId){
    try {
        await this.bucket.deleteFile(
            conf.appwriteBucketId, fileId
        )
        return true;
    } catch (error) {
       console.log("Service :: deleteFile :: error ", error) 
       return false;    
    }
  }

  getFilePreview(fileId){
    try {
        const file =  this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
        return file;
    } catch (error) {
        console.log("Service :: getFilePreview :: error ", error)
    }
  }


  
}
const service = new Service();

export default service;
