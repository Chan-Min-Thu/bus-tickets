import {
  AppBar,
  Box,
  Button,
  Divider,
  InputBase,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  alpha,
  styled,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));
const TopBar = () => {
  const {data:session} = useSession();
  const router = useRouter();
  const navItems = ["Routes", "Bookings"];
  return (
    <Box sx={{ flexGrow: 1 ,bgcolor:"#068FFF"}}>
      <AppBar
        position="static"
        sx={{
          display: "flex",
          flexDirection: "row",
          bgcolor:"#068FFF",
          px:5,
          justifyContent: "space-between"
        }}
      >
        <Typography variant="h6" sx={{mt:2, fontFamily: "fantasy" }}>
          Trippy Office
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "row" ,alignItems:"center",mr:4}}>
          {/* <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search> */}
          <List sx={{ display: "flex", flexDirection: "row", }}>
            {navItems.map((item) => (
              <ListItem key={item} disablePadding>
                <Link href={`/office/${item.toLowerCase()}`} style={{textDecoration:"none",color:"#fff"}}>
                <ListItemButton sx={{ textAlign: "center" }}>
                  <ListItemText primary={item} />
                </ListItemButton>
                </Link>
              </ListItem>
            ))}
          </List>
          {session ? <Button color="inherit" onClick={()=>signOut({callbackUrl:"/office"})}>Log out</Button>:<Button color="inherit" onClick={()=>router.push("/office/routes")}>Log in</Button>}
          
        </Box>
      </AppBar>
    </Box>
  );
};
export default TopBar;
