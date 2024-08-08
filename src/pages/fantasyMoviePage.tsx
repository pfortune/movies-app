import React, { useState, useContext } from "react";
import { Grid, Button } from "@mui/material";
import FantasyMovieForm, { FantasyMovieFormData } from "../components/Forms/FantasyMovieForm";
import FantasyMovieDetails from "../components/Media/Movie/FantasyMovieDetails";
import { MediaContext } from "../contexts/mediaContext";

const FantasyMoviePage: React.FC = () => {
    const { saveFantasyMovie } = useContext(MediaContext);

    const [formData, setFormData] = useState<FantasyMovieFormData>({
        title: "",
        description: "",
        genreId: "",
        genreName: "",
        releaseDate: "",
        runtime: "",
        director: "",
        cast: [],
        oscarWinner: false,
        posterFile: null,
        poster: null,
        productionCompany: "",
    });

    const handleFormChange = (field: keyof FantasyMovieFormData, value: any) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const handleSave = () => {
        saveFantasyMovie(formData);
    };

    return (
        <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
                <FantasyMovieForm formData={formData} onChange={handleFormChange} />
                <Button variant="contained" color="primary" onClick={handleSave} sx={{ mt: 2 }}>
                    Save Fantasy Movie
                </Button>
            </Grid>
            <Grid item xs={12} md={6}>
                <FantasyMovieDetails movie={formData} />
            </Grid>
        </Grid>
    );
};

export default FantasyMoviePage;
