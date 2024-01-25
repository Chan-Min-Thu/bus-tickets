import { Google } from "@mui/icons-material"
import { Box, Button } from "@mui/material"
import { signIn, useSession } from "next-auth/react"

const SignIn = ()=>{
    const {data:session} = useSession();
    return(
        <Box  sx={{display:"flex",justifyContent:"center",mt:30}}>
                <Button variant="contained" sx={{p:2}} onClick={()=>signIn("google",{callbackUrl:"/office/routes"})}>
                    <Google sx={{pr:2}}/>Sign in with google</Button>
            </Box>
    )
}
export default SignIn;