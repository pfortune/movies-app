import React, { useState } from "react";
import FilterCard from "./FilterMoviesCard";
import Fab from "@mui/material/Fab";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { BaseMovieProps } from "../../../types/interfaces";
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import SpicyTitle from "../../Layout/SpicyTitle";

export const titleFilter = (movie: BaseMovieProps, value: string): boolean => {
    return movie.title.toLowerCase().search(value.toLowerCase()) !== -1;
};

export const genreFilter = (movie: BaseMovieProps, value: string) => {
    const genreId = Number(value);
    const genreIds = movie.genre_ids;
    return genreId > 0 && genreIds ? genreIds.includes(genreId) : true;
};

const styles = {
    root: {
        backgroundColor: "#bfbfbf",
    },
    fab: {
        marginTop: 8,
        position: "fixed",
        top: 20,
        right: 16,
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
    },
    dialog: {
        padding: '20px',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
    },
    dialogContent: {
        padding: '20px',
    },
};

interface MovieFilterUIProps {
    onFilterValuesChange: (f: string, s: string) => void;
    titleFilter: string;
    genreFilter: string;
    startYearFilter: string;
    endYearFilter: string;
}

const MovieFilterUI: React.FC<MovieFilterUIProps> = ({ onFilterValuesChange, titleFilter, genreFilter, startYearFilter, endYearFilter }) => {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <>
            <Fab
                color="primary"
                variant="extended"
                onClick={() => setModalOpen(true)}
                sx={styles.fab}
            >
                <MovieFilterIcon sx={{ marginRight: '8px' }} />
                Filter
            </Fab>
            <Dialog
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                aria-labelledby="filter-dialog-title"
                PaperProps={{
                    sx: styles.dialog,
                }}
            >
                <DialogTitle id="filter-dialog-title">
                    <SpicyTitle>
                        <MovieFilterIcon sx={{ marginRight: '8px', verticalAlign: 'middle' }} />
                        Filter Movies
                    </SpicyTitle>
                </DialogTitle>
                <DialogContent sx={styles.dialogContent}>
                    <FilterCard
                        onUserInput={onFilterValuesChange}
                        titleFilter={titleFilter}
                        genreFilter={genreFilter}
                        startYearFilter={startYearFilter}
                        endYearFilter={endYearFilter}
                    />
                </DialogContent>
            </Dialog>
        </>
    );
};

export default MovieFilterUI;
