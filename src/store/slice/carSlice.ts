import { CarType, CreateCarOption, DeleteCarOption, UpdateCarOption } from "@/type/car";
import { config } from "@/util/config";
import { ExpressCar } from "@prisma/client";
import { PayloadAction, Update, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState:CarType={
    items:[],
    isLoading:false,
    error:null
}

export const createCar = createAsyncThunk("car/createCar",async(options:CreateCarOption,thunkAPI)=>{
    const {name,startFrom,arrivedTo,duration,departureTime,arrivedTime,price,isVIP,seats,onSuccess,isError} = options
    
    try{
      const response = await fetch(`${config.apiBaseUrl}/office/routes`,{
        method:"POST",
        headers:{"content-type":"application/json"},
        body:JSON.stringify({name,startFrom,arrivedTo,duration,departureTime,arrivedTime,price,isVIP,seats})
      });
      const {expressCar}= await response.json();
      thunkAPI.dispatch(addCar(expressCar))
    //   thunkAPI.dispatch(setCar(expressCar))
      onSuccess && onSuccess({})
    }catch(err){
       isError && isError(err)
    }
})

export const updateCar = createAsyncThunk("car/updateCar",async(options:UpdateCarOption,thunkAPI)=>{
    const {id,name,startFrom,arrivedTo,duration,departureTime,arrivedTime,price,isVIP,seats,onSuccess,isError} = options
    try{
       const response = await fetch(`${config.apiBaseUrl}/office/routes`,{
        method:"PUT",
        headers:{"content-type":"application/json"},
        body:JSON.stringify({id,name,startFrom,arrivedTo,duration,departureTime,arrivedTime,price,isVIP,seats})
       })
       const {expressCar} = await response.json();
       thunkAPI.dispatch(updateState(expressCar))
       onSuccess && onSuccess(expressCar);
    }catch(err){
        isError && isError(err)
    }
})

export const deleteCar = createAsyncThunk("car/deleteCar",async(payload:DeleteCarOption,thunkAPI)=>{

    const {id,onSuccess,isError} = payload;
    console.log(id)
    try{
      await fetch(`${config.apiBaseUrl}/office/routes?id=${id}`,{
        method:"DELETE"
      })
      thunkAPI.dispatch(removeCar({id}))
    }catch(err){
        isError && isError(err) 
    }
})
const CarSlice = createSlice({
    name:"car",
    initialState,
    reducers:{
       setCar:(state,action)=>{
        state.items = action.payload
       },
       addCar:(state,action:PayloadAction<ExpressCar>)=>{
        state.items = [...state.items,action.payload]
       },
       updateState:(state,action:PayloadAction<ExpressCar>)=>{
        const filteredCar = state.items.find(item=> item.id === action.payload.id);
        const otherCars = state.items.filter(item =>item.id !== action.payload.id)
        state.items = [...otherCars,action.payload]
       },
       removeCar:(state,action)=>{
        const otherCars = state.items.filter(item =>item.id !== action.payload.id)
        state.items = [...otherCars]
       }
       

    }
})


export const {setCar,addCar,updateState,removeCar} = CarSlice.actions;

export default CarSlice.reducer;