export interface AppType{
    init:boolean,
    isLoading:false,
    error:Error | null,
}

export interface BasicOptions{
    onSuccess?:(data:any)=>void;
    isError?:(data:any)=>void;
}

export interface AppSliceOptions extends BasicOptions{ 
       
}