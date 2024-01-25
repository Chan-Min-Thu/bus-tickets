export interface AppType{
    init:boolean,
    isLoading:false,
    error:Error | null,
}

export interface BaseOptions{
    onSuccess?:(data:any)=>void;
    isError?:(data:any)=>void;
}

export interface AppSliceOptions extends BaseOptions{ 
       
}