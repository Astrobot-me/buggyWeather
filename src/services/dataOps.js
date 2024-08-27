import {Account,Client,Databases,ID,Storage,Query} from "appwrite";
import { secret } from "./conf";


class DataServices{
    
    client = new Client();
    account;
    databases;

    constructor(){
        this.client.setEndpoint(secret.APPRWRITE_URI)
                    .setProject(secret.APPRWRITE_ID)

        this.account = new Account(this.client);
        this.databases = new Databases(this.client);
    }

    async createRecord({userAuthId,defaultPlace,defaultLat,defaultLong,defaultMetric="metric",defaultCnt=15}){
        try {
            return await this.databases.createDocument(
                secret.APPRWRITE_dbID,
                secret.APPWRITE_USER_COLLECTION_ID,
                ID.unique(),
                {   userAuthId,
                    defaultPlace,
                    defaultLat,
                    defaultLong,
                    defaultMetric,
                    defaultCnt
                    
                }
            )
        } catch (error) {
            console.log("Appwrite :: createRecord :: ",error);
           return false 
        }
    }

    async getRecord({id}){
        try {
            return await this.databases.getDocument(
                secret.APPRWRITE_dbID,
                secret.APPWRITE_USER_COLLECTION_ID,
                id
            )
        } catch (error) {
            console.log("Appwrite :: getRecord ::", error);
            return false
        }
    }

    async getUserconfig(queries){
       
        try {
            // console.log("query",queries);
            
            return await this.databases.listDocuments(
                secret.APPRWRITE_dbID,
                secret.APPWRITE_USER_COLLECTION_ID,
                queries

            )
        } catch (error) {
            console.log("Appwrite :: getRecord :: ", error);
            return false;
        }   
       
    }

    async updateRecord({docid,defaultPlace,defaultLat,defaultLong,defaultMetric="metric",defaultCnt=15}){
        try {
            // console.log("Data Updated");
            
            return await this.databases.updateDocument(
                secret.APPRWRITE_dbID,
                secret.APPWRITE_USER_COLLECTION_ID,
                docid,
                {
                   defaultPlace,
                   defaultLat,
                   defaultLong,
                   defaultMetric,
                   defaultCnt
                }
            )
        } catch (error) {
            console.log("Apprwrite Error :: updateRecord", error);
            return false
        }
    }

    //search history Create & Update Operations

    async createSearchRecord({userAuthId,resultSet,place}){
        try {
            return await this.databases.createDocument(
                secret.APPRWRITE_dbID,
                secret.APPWRITE_SEARCH_COLLECTION_ID,
                ID.unique(),
                {   
                    userAuthId,
                    resultSet,
                    place   
                }
            )
        } catch (error) {
            console.log("Appwrite :: createSearchRecord :: ",error);
           return false 
        }
    }
    async updateSearchRecord({docid,resultSet,place}){
        try {
   
            return await this.databases.updateDocument(
                secret.APPRWRITE_dbID,
                secret.APPWRITE_SEARCH_COLLECTION_ID,
                docid,
                {
                   resultSet,
                   place
                }
            )
        } catch (error) {
            console.log("Apprwrite Error :: updateSearchRecord", error);
            return false
        }
    }

    async getUserSearchHistory(userAuthId,place){
       
        try {
            // console.log("query",queries);
            
            return await this.databases.listDocuments(
                secret.APPRWRITE_dbID,
                secret.APPWRITE_SEARCH_COLLECTION_ID,
                [
                    Query.equal("userAuthId",[userAuthId]),
                    Query.equal("place",[place])
                ]

            )
        } catch (error) {
            console.log("Appwrite :: getUserSearchHistory :: ", error);
            return false;
        }   
       
    }
    async getAllSearchHistory(userAuthId){
       
        try {
            // console.log("query",queries);
            
            return await this.databases.listDocuments(
                secret.APPRWRITE_dbID,
                secret.APPWRITE_SEARCH_COLLECTION_ID,
                [
                    Query.equal("userAuthId",[userAuthId]),
                    Query.limit(8),
                    Query.orderDesc("$updatedAt")
                ]

            )
        } catch (error) {
            console.log("Appwrite :: getAllSearchHistory :: ", error);
            return false;
        }   
       
    }


    async deleteRecord({id}){
        try {
            await this.databases.deleteDocument(
                secret.APPRWRITE_dbID,
                secret.APPWRITE_SEARCH_COLLECTION_ID,
                id
            )
            return true;
        } catch (error) {
            console.log("Appwrite Error :: deleteRecord :: ",error);
            return false
            
        }
    }


}

const dataServices = new DataServices();

export default dataServices;