import {createSlice} from '@reduxjs/toolkit';


const initialState = {
    status:false,
    userData:null,
    userConfig:null,
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        login:(state,action)=>{
            state.status = true;
            state.userData = action.payload.userData;
            state.userConfig = action.payload.userConfig;

        },
        logout:(state,action)=>{
            state.status= false
            state.userData = null
            state.userConfig = null
        }
    }
})

export const {login,logout} = authSlice.actions;
export default authSlice.reducer;