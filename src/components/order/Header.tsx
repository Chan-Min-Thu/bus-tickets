import { Box, Drawer, List, Typography } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import MenuIcon from "@mui/icons-material/Menu";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";

const Header = () => {
  const navItems = ["Home", "Search", "Contact"];
  const router = useRouter();
  const isOrder = router.pathname.includes("order");
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Box sx={{ position: "relative" }}>
      <Box sx={{ display: "flex", position: "sticky", zIndex: 5 }}>
        {!isOrder && (
          <Image
            src="./header.svg"
            alt="header"
            width={100}
            height={100}
            style={{ width: "100%", height: "100%" }}
          />
        )}
      </Box>
      <Box sx={{ width: `${isOrder ? "100vw" : "90vw"}`, mx: "auto" }}>
        <Box
          sx={{
            bgcolor: `${isOrder ? "#332941" : ""}`,
            minWidth: `${isOrder ? "100vw" : "90vw"}`,
            mx: "auto",
            height: 100,
            display: "flex",
            justifyContent: "space-around",
            flexDirection: "row",
            position: "fixed",
            top: { xs: "-10px", sm: `${isOrder ? "0px" : "30px"}` },
            zIndex: 5,
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              minWidth: "20vw",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Box sx={{ bgcolor: "red", p: 1, borderRadius: 2, mr: 1 }}>
              <DirectionsBusIcon
                sx={{ fontSize: { xs: 25, md: 40 }, color: "#EEEEEE" }}
              />{" "}
            </Box>
            <Typography
              sx={{
                color: "success.main",
                fontFamily: "sans-serif",
                fontSize: { xs: 20, sm: 30 },
              }}
            >
              Trippy
            </Typography>{" "}
          </Box>
          <Box
            sx={{
              minWidth: "20vw",
              display: { md: "flex", sm: "none", xs: "none" },
              flexDirection: "row",
              fontSize: 30,
              justifyContent: "space-between",
            }}
          >
            {navItems.map((item) => (
              <Link
                href={item === "Home" ? "/" : `/order/${item.toLowerCase()}`}
                key={item}
              >
                <ListItem disablePadding>
                  <ListItemButton sx={{ textAlign: "center" }}>
                    <ListItemText
                      sx={{ color: "success.main" }}
                      primary={item}
                    />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </Box>
          <Box sx={{ display: { sm: "block", md: "none" }, color: "#FFFFFF" }}>
            <MenuIcon
              sx={{ display: open === false ? "block" : "none" }}
              onClick={() => setOpen(true)}
            />
          </Box>
          <Drawer
            anchor="right"
            sx={{ width: 100 }}
            open={open}
            onClose={() => setOpen(false)}
          >
            <List>
              {navItems.map((text, index) => (
                <Link
                  href={text === "Home" ? "/" : `/order/${text.toLowerCase()}`}
                  key={text}
                >
                  <ListItem key={text} disablePadding>
                    <ListItemButton>
                      <ListItemText primary={text} />
                    </ListItemButton>
                  </ListItem>
                </Link>
              ))}
            </List>
          </Drawer>
        </Box>
      </Box>
    </Box>
  );
};
export default Header;
