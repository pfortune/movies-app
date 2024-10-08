import React, { MouseEvent, useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { MediaContext } from "../../../contexts/mediaContext";
import { BaseMovieProps } from "../../../types/interfaces";

const RemoveFromPlaylistIcon: React.FC<{ movie: BaseMovieProps }> = ({ movie }) => {
    const context = useContext(MediaContext);

    const onUserRequest = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        context.removeFromPlaylist(movie);
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
