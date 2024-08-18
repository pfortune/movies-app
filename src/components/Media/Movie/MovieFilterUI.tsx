import React, { useState } from "react";
import FilterMoviesCard from "./FilterMovieCard";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import { BaseMovieProps } from "../../../types/interfaces";

// Filter functions for the movie list by title and genre
export const titleFilter = (movie: BaseMovieProps, value: string): boolean => {
    return movie.title.toLowerCase().includes(value.toLowerCase());
};

export const genreFilter = (movie: BaseMovieProps, value: string) => {
    const genreId = Number(value);
    const genreIds = movie.genre_ids;
    return genreId > 0 && genreIds ? genreIds.includes(genreId) : true;
};

// Styles for the filter drawer and the filter button
const styles = {
    root: {
        backgroundColor: "#1a1a1a",
    },
    drawer: {
        backgroundColor: "#1a1a1a",
        color: "white",
    },
    fabContainer: {
        position: "fixed",
        bottom: 10,
        left: 30,
    },
    fab: {
        backgroundColor: "white",
        color: "black",
        borderRadius: "5px",
        "&:hover": {
            backgroundColor: "#666666",
            color: "white",
        },
    },
};

interface MovieFilterUIProps {
    onFilterValuesChange: (f: string, s: string) => void;
    titleFilter: string;
    genreFilter: string;
    startYearFilter?: string;
    endYearFilter?: string;
}

const MovieFilterUI: React.FC<MovieFilterUIProps> = ({
    onFilterValuesChange,
    titleFilter,
    genreFilter,
}) => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <>
            <Box sx={styles.fabContainer}>
                <Fab
                    color="primary"
                    variant="extended"
                    onClick={() => setDrawerOpen(!drawerOpen)} // Toggle drawer open/close
                    sx={styles.fab}
                >
                    Filter
                </Fab>
            </Box>
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                PaperProps={{
                    sx: styles.drawer,
                }}
            >
                <FilterMoviesCard
                    onUserInput={onFilterValuesChange}
                    titleFilter={titleFilter}
                    genreFilter={genreFilter}
                />
            </Drawer>
        </>
    );
};

export default MovieFilterUI;
