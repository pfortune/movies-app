import React, { MouseEvent, useContext } from "react";
import { MediaContext } from "../../../contexts/mediaContext";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { BaseMediaProps } from "../../../types/interfaces";
import { useAuth } from "../../../hooks/useAuth";

const AddToPlaylistIcon: React.FC<BaseMediaProps> = (media) => {
    const mediaContext = useContext(MediaContext);
    const authContext = useAuth();

    const onUserSelect = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        mediaContext.addToPlaylist(media);
    };

    // If the user is not logged in, return null to render nothing
    if (!authContext.user) {
        return null;
    }

    return (
        <IconButton aria-label="add to playlist" onClick={onUserSelect}>
            <PlaylistAddIcon color="primary" fontSize="large" />
        </IconButton>
    );
};

export default AddToPlaylistIcon;
