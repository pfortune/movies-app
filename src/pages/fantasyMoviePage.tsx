import React, { useState, useContext, useEffect } from "react";
import { Grid, Snackbar, Alert, Typography, Button } from "@mui/material";
import FantasyMovieForm, { FantasyMovieFormData } from "../components/Forms/FantasyMovieForm";
import FantasyMovieDetails from "../components/Media/FantasyMovie/FantasyMovieDetails"; // Updated import
import { MediaContext } from "../contexts/mediaContext";
import { useQueryClient } from "@tanstack/react-query";
import Spinner from "../components/UI/Spinner";
import FantasyMovieHeader from "../components/Header/FantasyMovieHeader";
import { useNavigate } from 'react-router-dom';

const FantasyMoviePage: React.FC = () => {
    const [formData, setFormData] = useState<FantasyMovieFormData>({
        title: "",
        description: "",
        genreId: "",
        genreName: "",
        releaseDate: "",
        runtime: "0",
        director: "",
        cast: [],
        oscarWinner: false,
        poster: null,
        posterFile: null,
        productionCompany: "",
    });

    const queryClient = useQueryClient();

    useEffect(() => {
        console.log("FORM DATA >>: ", formData);
    }, [formData]);

    const [errors, setErrors] = useState<{ [key in keyof FantasyMovieFormData]?: string }>({});
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [loading, setLoading] = useState(false);
    const context = useContext(MediaContext);
    const navigate = useNavigate();

    const handleFormChange = (field: keyof FantasyMovieFormData, value: any) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [field]: "",
        }));
    };

    const validateForm = () => {
        const newErrors: { [key in keyof FantasyMovieFormData]?: string } = {};

        if (!formData.title) newErrors.title = "Title is required";
        if (!formData.description) newErrors.description = "Description is required";
        if (!formData.genreId) newErrors.genreId = "Genre is required";
        if (!formData.releaseDate) newErrors.releaseDate = "Release Date is required";
        if (!formData.runtime) newErrors.runtime = "Runtime is required";
        if (!formData.director) newErrors.director = "Director is required";
        if (!formData.productionCompany) newErrors.productionCompany = "Production Company is required";

        setErrors(newErrors);
        console.log("Validation errors:", newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSave = async () => {
        console.log("Saving movie...");
        if (!validateForm()) {
            console.log("Validation failed");
            return;
        }

        setLoading(true);
        const movieId = await context.saveFantasyMovie(formData);
        setLoading(false);

        if (movieId) {
            queryClient.invalidateQueries("fantasyMovies");

            setOpenSnackbar(true);
            setTimeout(() => {
                navigate(`/fantasy-movie/${movieId}`);
            }, 2000);
        } else {
            console.error("Movie saving failed");
        }
    };

    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };

    return (
        <Grid container spacing={4}>
            <Grid item xs={12}>
                <FantasyMovieHeader title="Create Your Fantasy Movie" showListLink />
            </Grid>
            <Grid item xs={12} md={6}>
                <FantasyMovieForm formData={formData} onChange={handleFormChange} errors={errors} />
                {loading ? (
                    <Spinner />
                ) : (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSave}
                        sx={{ mt: 2 }}
                    >
                        Save Fantasy Movie
                    </Button>
                )}
            </Grid>
            <Grid item xs={12} md={6}>
                <FantasyMovieDetails
                    movie={formData}
                    maxWidth={800}
                    cardMediaHeight="600px"
                    layout="stacked"
                />
            </Grid>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert onClose={handleSnackbarClose} severity="success" variant="filled">
                    <Typography variant="h6">Fantasy movie saved successfully!</Typography>
                </Alert>
            </Snackbar>
        </Grid>
    );
};

export default FantasyMoviePage;
