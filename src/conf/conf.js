const conf = {
    appwriteUrl: String(import.meta.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.VITE_APPWRITE_PROJECT_ID),
    appwriteDocumentId: String(import.meta.VITE_APPWRITE_DOCUMENT_ID),
    appwriteCollectionId: String(import.meta.VITE_APPWRITE_COLLECTION_ID),
    appwriteBucketId: String(import.meta.VITE_APPWRITE_BUCKET_ID)
};

export default conf;