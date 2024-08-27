import {Client,Account,ID} from "appwrite";
import { secret } from "./conf.js";
// import 'dotenv/config';
// import 


export const appwriteCon= () =>{
    // console.log(PROJECT_ID);
    
    const client = new Client()
            .setEndpoint(secret.APPRWRITE_URI)
            .setProject(secret.APPRWRITE_ID);

        
    const account = new Account(client);
    console.log("Conneted to APPWRITE");

    return {account,client};
}