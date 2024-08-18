import React, { MouseEvent, useContext } from "react";
import { MediaContext } from "../../../contexts/mediaContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { BaseMovieProps } from "../../../types/interfaces";
import { useAuth } from "../../../hooks/useAuth";

const AddToFavouritesIcon: React.FC<{ movie: BaseMovieProps }> = ({ movie }) => {
    const mediaContext = useContext(MediaContext);
    const authContext = useAuth();

    const onUserSelect = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        mediaContext.addToFavourites(movie);
    };

    // If the user is not logged in, return null to render nothing
    if (!authContext.user) {
        return null;
    }

    return (
        <IconButton aria-label="add to favorites" onClick={onUserSelect}>
            <FavoriteIcon color="primary" fontSize="large" />
        </IconButton>
    );
};

export default AddToFavouritesIcon;
