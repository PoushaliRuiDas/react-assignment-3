import { Client, Databases, ID,  Account } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://nyc.cloud.appwrite.io/v1")
  .setProject("6a016d9c001ed462f8e4");

export const databases = new Databases(client);
export const account = new Account(client);
export const DATABASE_ID = "6a016fcc0021e6282b0f";
export const COLLECTION_ID = "students";

export { ID };