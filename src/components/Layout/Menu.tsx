import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import HomeIcon from "@mui/icons-material/Home";
import MovieIcon from "@mui/icons-material/Movie";
import TvIcon from "@mui/icons-material/Tv";
import PersonIcon from "@mui/icons-material/Person";
import InfoIcon from "@mui/icons-material/Info";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
interface MenuProps {
    handleDrawerToggle: () => void;
    isMobile: boolean;
}

const Menu: React.FC<MenuProps> = ({ handleDrawerToggle, isMobile }) => {
    const navigate = useNavigate();
    const { user, signout } = useAuth();

    const [openSections, setOpenSections] = useState({
        movies: false,
        tvShows: false,
        account: false,
    });

    const handleToggleSection = (section: keyof typeof openSections) => {
        setOpenSections(prevState => ({
            ...prevState,
            [section]: !prevState[section],
        }));
    };

    const handleMenuSelect = (pageURL: string) => {
        navigate(pageURL);
        if (isMobile) handleDrawerToggle();
    };

    const menuOptions = [
        { label: "Home", path: "/", icon: <HomeIcon /> },
        {
            label: "Movies", icon: <MovieIcon />, onClick: () => handleToggleSection('movies'), children: [
                { label: "Popular", path: "/movies/popular" },
                { label: "Now Playing", path: "/movies/now-playing" },
                { label: "Upcoming", path: "/movies/upcoming" },
            ], open: openSections.movies
        },
        {
            label: "TV Shows", icon: <TvIcon />, onClick: () => handleToggleSection('tvShows'), children: [
                { label: "Popular", path: "/tv/popular" },
                { label: "Top Rated", path: "/tv/top-rated" },
                { label: "Airing Today", path: "/tv/airing-today" },
            ], open: openSections.tvShows
        },
        {
            label: "Account", icon: <PersonIcon />, onClick: () => handleToggleSection('account'), children: user ? [
                { label: "Fantasy Movie", path: "/fantasy-movie" },
                { label: "View Playlist", path: "/playlist" },
                { label: "View Favourites", path: "/movies/favourites" },
                { label: "Logout", path: "/", action: signout },
            ] : [
                { label: "Login", path: "/login" },
            ], open: openSections.account
        }
    ];

    return (
        <List>
            {menuOptions.map((opt) => (
                <React.Fragment key={opt.label}>
                    <ListItem
                        onClick={opt.onClick ? opt.onClick : () => handleMenuSelect(opt.path!)}
                        sx={{ cursor: 'pointer' }}
                        aria-expanded={opt.children ? opt.open : undefined}
                    >
                        {opt.icon}
                        <ListItemText primary={opt.label} sx={{ pl: 2, fontWeight: 'bold' }} />
                        {opt.children ? (opt.open ? <ExpandLess /> : <ExpandMore />) : null}
                    </ListItem>
                    {opt.children && (
                        <Collapse in={opt.open} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {opt.children.map((child) => (
                                    <ListItem
                                        key={child.label}
                                        onClick={() => {
                                            if (child.action) {
                                                child.action();
                                            } else {
                                                handleMenuSelect(child.path);
                                            }
                                        }}
                                        sx={{ cursor: 'pointer', pl: 6 }}
                                    >
                                        <ListItemText primary={child.label} />
                                    </ListItem>
                                ))}
                            </List>
                        </Collapse>
                    )}
                </React.Fragment>
            ))}
        </List>
    );
};

export default Menu;
