import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Menu from "./Menu";

const drawerWidth = 240;

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const SiteHeader: React.FC<{ setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>, drawerOpen: boolean }> = ({ setDrawerOpen, drawerOpen }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" elevation={0} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <IconButton
                        aria-label="menu"
                        onClick={toggleDrawer}
                        color="inherit"
                        size="large"
                        edge="start"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h4" sx={{ flexGrow: 1 }}>
                        Movie & TV Guide
                    </Typography>
                    <Typography variant="h6">
                        All you ever wanted to know about Movies!
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant={isMobile ? "temporary" : "persistent"}
                open={drawerOpen}
                onClose={toggleDrawer}
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <Menu
                        handleDrawerToggle={toggleDrawer}
                        isMobile={isMobile}
                    />
                </Box>
            </Drawer>
            <Offset />
        </Box>
    );
};

export default SiteHeader;
