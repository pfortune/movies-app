import React from "react";
import TVShowListHeader from "../Header/TVShow/TVShowListHeader";
import Grid from "@mui/material/Grid";
import TVShowList from "../Media/TVShow/TVShowList";
import { TVShowListPageTemplateProps } from "../../types/interfaces";

const styles = {
    root: {
        backgroundColor: "#bfbfbf",
    }
};

const TVShowListPageTemplate: React.FC<TVShowListPageTemplateProps> = ({ tvShows, title, action }) => {
    return (
        <Grid container sx={styles.root}>
            <Grid item xs={12}>
                <TVShowListHeader title={title} />
            </Grid>
            <Grid item container spacing={1}>
                <TVShowList
                    action={action}
                    tvShows={tvShows}
                />
            </Grid>
        </Grid>
    );
}

export default TVShowListPageTemplate;
