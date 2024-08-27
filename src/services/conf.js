export const secret = {
    APPRWRITE_URI : String(import.meta.env.VITE_APPWRITE_PROJECT_URI),
    APPRWRITE_ID: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    APPRWRITE_dbID: String(import.meta.env.VITE_DATABASE_ID),
    APPWRITE_SEARCH_COLLECTION_ID: String(import.meta.env.VITE_SEARCH_COLLECTION_ID),
    APPWRITE_USER_COLLECTION_ID: String(import.meta.env.VITE_USER_COLLECTION_ID),
    APPWRITE_STORAGE_ID: String(import.meta.env.VITE_BUCKET_ID),
    ACCWEATHER_SECRET: String(import.meta.env.VITE_ACCWEATHER_SECRET),
    POSITIONSTACK_SECRET : String(import.meta.env.VITE_POSITIONSTACK_SECRET),
    OWAPI_SECRET : String(import.meta.env.VITE_OWAPI_SECRET),
    REDIRECT_URL:String(import.meta.env.VITE_REDIRECT_URL)
} 