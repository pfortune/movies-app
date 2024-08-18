import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import HomeIcon from "@mui/icons-material/Home";
import StarIcon from "@mui/icons-material/Star";
import MovieIcon from "@mui/icons-material/Movie";
import EventIcon from "@mui/icons-material/Event";
import PersonIcon from "@mui/icons-material/Person";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

interface MenuProps {
    handleDrawerToggle: () => void;
    isMobile: boolean;
}

interface MenuItem {
    label: string;
    path?: string;
    icon?: React.ReactNode;
    onClick?: () => void;
}

const Menu: React.FC<MenuProps> = ({ handleDrawerToggle, isMobile }) => {
    const navigate = useNavigate();
    const { user, signout } = useAuth();

    const handleMenuSelect = (pageURL: string) => {
        navigate(pageURL);
        if (isMobile) handleDrawerToggle();
    };

    const menuOptions: (MenuItem | "divider")[] = [
        { label: "Home", path: "/", icon: <HomeIcon /> },
        { label: "Popular Movies", path: "/movies/popular", icon: <StarIcon /> },
        { label: "Now Playing", path: "/movies/now-playing", icon: <MovieIcon /> },
        { label: "Upcoming Movies", path: "/movies/upcoming", icon: <EventIcon /> },
        "divider",
        ...(user ? [
            { label: "Fantasy Movie", path: "/fantasy-movie", icon: <MovieCreationIcon /> },
            { label: "View Playlist", path: "/playlist", icon: <PlaylistPlayIcon /> },
            { label: "View Favourites", path: "/movies/favourites", icon: <FavoriteIcon /> },
            {
                label: "Logout",
                path: "/",
                icon: <ExitToAppIcon />,
                onClick: () => {
                    signout();
                    if (isMobile) handleDrawerToggle();
                }
            }
        ] : [
            { label: "Login", path: "/login", icon: <PersonIcon /> }
        ])
    ];

    return (
        <List>
            {menuOptions.map((opt, index) => (
                opt === "divider" ? (
                    <Divider key={`divider-${index}`} sx={{ my: 2 }} />
                ) : (
                    <ListItem
                        key={opt.label}
                        onClick={opt.onClick ? opt.onClick : () => opt.path && handleMenuSelect(opt.path)}
                        sx={{ cursor: 'pointer' }}
                    >
                        {opt.icon}
                        <ListItemText primary={opt.label} sx={{ pl: 2, fontWeight: 'bold' }} />
                    </ListItem>
                )
            ))}
        </List>
    );
};

export default Menu;
