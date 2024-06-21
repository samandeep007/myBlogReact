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

  // Create a new account
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(), // Generate a unique ID
        email,
        password,
        name
      );
      if (!userAccount) {
        // If the user is not created
        return userAccount;
      }
      //Call another method
      return this.login({ email, password }); // Login the user
    } catch (error) {
      throw error;
    }
  }

  // Login the user
  async login({ email, password }) {
    try {
      await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  // Get the current user
  async getCurrentUser() {
    try {
      return await this.account.get(); // Get the current user
    } catch (error) {
      console.log("Appwrite service :: getCurrentUser :: error ", error);
    }

    return null; // If the user is not found
  }

  //Logout the user
  async logout() {
    try {
      await this.account.deleteSessions(); // Delete the current session
    } catch (error) {
      console.log("Appwrite service :: logout :: error ", error);
    }
  }

}



const authService = new AuthService();

export default authService;
