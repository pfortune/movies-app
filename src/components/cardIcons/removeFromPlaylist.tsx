import React, { MouseEvent, useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { MoviesContext } from "../../contexts/moviesContext";
import { BaseMovieProps } from "../../types/interfaces";

const RemoveFromPlaylistIcon: React.FC<BaseMovieProps> = ({ id, title, ...props }) => {
    const context = useContext(MoviesContext);

    const onUserRequest = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        context.removeFromPlaylist({ id, title, ...props });
    };

    return (
        <IconButton
            aria-label="remove from must watch"
            onClick={onUserRequest}
        >
            <DeleteIcon color="primary" fontSize="large" />
        </IconButton>
    );
};

export default RemoveFromPlaylistIcon;