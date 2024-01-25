import { AppType, AppSliceOptions } from "@/type/app";
import { config } from "@/util/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { error } from "console";
import { setCar } from "./carSlice";



const initialState:AppType ={
    init:false,
    isLoading:false,
    error:null
    
}
export const getData = createAsyncThunk("car/getData",async(payload:AppSliceOptions,thunkAPI)=>{
   const {onSuccess,isError} = payload;
  try{
  const response = await fetch(`${config.apiBaseUrl}/office/app`)
  const {expressCar} = await response.json();
  thunkAPI.dispatch(setInit(true));
  thunkAPI.dispatch(setCar(expressCar));
  onSuccess && onSuccess(expressCar)
  }catch(err){
    isError && isError(err)
  }
})
const appSlice = createSlice({
    name:"car",
    initialState,
    reducers:{
      setInit:(state,action)=>{
        state.init = action.payload
      }
    }

})
export const {setInit} = appSlice.actions;
export default appSlice.reducer;