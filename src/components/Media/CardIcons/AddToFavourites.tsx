import React, { MouseEvent, useContext } from "react";
import { MediaContext } from "../../../contexts/mediaContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { BaseMovieProps } from "../../../types/interfaces";

const AddToFavouritesIcon: React.FC<{ movie: BaseMovieProps }> = ({ movie }) => {
    const context = useContext(MediaContext);

    const onUserSelect = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        context.addToFavourites(movie);
    };

    return (
        <IconButton aria-label="add to favorites" onClick={onUserSelect}>
            <FavoriteIcon color="primary" fontSize="large" />
        </IconButton>
    );
};

export default AddToFavouritesIcon;
