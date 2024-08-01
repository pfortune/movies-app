import React from "react";
import TVShowCard from "./TVShowCard";
import Grid from "@mui/material/Grid";
import { BaseTVShowListProps } from "../../../types/interfaces";

const TVShowList: React.FC<BaseTVShowListProps> = ({ tvShows, action }) => {
    const tvShowCards = tvShows.map((tvShow) => (
        <Grid key={tvShow.id} item xs={12} sm={6} md={6} lg={4} xl={3}>
            <TVShowCard key={tvShow.id} tvShow={tvShow} action={action} />
        </Grid>
    ));

    return <>{tvShowCards}</>;
}

export default TVShowList;
