import React, { MouseEvent, useContext } from "react";
import { MediaContext } from "../../../contexts/mediaContext";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { BaseMediaProps } from "../../../types/interfaces";

const AddToPlaylistIcon: React.FC<BaseMediaProps> = (media) => {
    const context = useContext(MediaContext);

    const onUserSelect = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        context.addToPlaylist(media);
    };
    return (
        <IconButton aria-label="add to playlist" onClick={onUserSelect}>
            <PlaylistAddIcon color="primary" fontSize="large" />
        </IconButton>
    );
};

export default AddToPlaylistIcon;
