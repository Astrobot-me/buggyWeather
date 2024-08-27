import { Client, Account, ID } from "appwrite";
import { appwriteCon } from "./appwriteCon";
import { secret } from "./conf.js";

class AuthenticationService {
    client = new Client();
    account;

    constructor() {
        this.client
        .setEndpoint(secret.APPRWRITE_URI)
        .setProject(secret.APPRWRITE_ID)
        this.account = new Account(this.client)
    }

    async createAccount(email, password, name) {
       
        // console.log(`for ${email}: ${password} : ${name}`);
    
        try {
            const createdAccount = await this.account.create(ID.unique(), email, password, name);
            
            if (createdAccount) {
                       
                const loggedInUser = await this.login({email,password})
                // console.log("Logged In User: ",loggedInUser);
                const token = await this.verifyAccount("https:/localhost:5173")
                // console.log("Token:",token);
                
                // console.log("user", createdAccount);
                return loggedInUser;
        
            }
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async login({email,password}) {
        try {
            return await this.account.createEmailPasswordSession(email,password)
        } catch (error) {
            console.log("Appwrite Error :: login :: ",error);
            throw error
        }
    }
    getCurrentUser = async () =>{
        try {
            return await this.account.get()
        } catch (error) {
            console.log("Appwrite Error :: getCurrentUser :: ",error);
            throw error
        }
        return null;
    }

    deleteAllSessions = async () =>{
        try {
            return await this.account.deleteSessions("current")
        } catch (error) {
            console.log("Appwrite Error :: deleteAllSessions :: ",error);
            throw error
            
        }
    }

    async verifyAccount(url) {
        try {
            return await this.account.createVerification(`${secret.REDIRECT_URL}/verify`);
    
        } catch (error) {
            console.log(error.message);
            throw error
    
        }
    }
    
    async updateVerification(id,secret){
        try {
            return await this.account.updateVerification(id,secret)
        } catch (error) {
            console.log("Appwrite Error :: updateVerification :: ",error);
            throw error
        }
    }

}

const authService = new AuthenticationService();
export default authService;



export async function createAccount(email, password, name) {
    let user = null;
    console.log(`for ${email}: ${password} : ${name}`);

    try {
        const { account, client } = appwriteCon();
        const createdAccount = await account.create(ID.unique(), email, password, name);

        if (createdAccount) {
            user = createdAccount          
            const loggedInUser = await login({email,password})
            console.log("Logged In User: ",loggedInUser);
            const token = await verifyAccount("https://localhost:5173/verify")
            console.log("Token:",token);
            
        }
        console.log("user", createdAccount);
        return user;

    } catch (error) {
        console.log(error);
        return error;
    }
}

export async function verifyAccount(url) {
    try {
        const { account, client } = appwriteCon();
        return await account.createVerification(url);

    } catch (error) {
        console.log(error.message);
        throw error

    }
}

export async function login({email,password}) {
    try {
        
        const { account, client } = appwriteCon();
        return await account.createEmailPasswordSession(email,password)
    } catch (error) {
        throw error
    }
}


export const deleteAllSessions = async () =>{
    try {
        const {account,client} = appwriteCon();

        return await account.deleteSessions("current")
    } catch (error) {
        console.log(error);
        
    }
}

export const getCurrentUser = async () =>{
    try {
        const {account,client} = appwriteCon();
        return await account.get()
    } catch (error) {
        console.log(error);
        
    }
    return null;
}


