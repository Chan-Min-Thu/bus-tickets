import SignIn from "@/components/Signin";
import { Google } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Office = ()=>{
    const {data:session} = useSession();
    const router = useRouter();
    if(!session){
        return(
            <SignIn/>
        )
    }else{
        router.push("/office/routes")
    }
   
}

export default Office;