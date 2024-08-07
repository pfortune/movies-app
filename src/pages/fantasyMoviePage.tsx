import React, { useState, useContext } from "react";
import { Grid, Button, Box } from "@mui/material";
import FantasyMovieForm, { FantasyMovieFormData } from "../components/Forms/FantasyMovieForm";
import FantasyMovieDetails from "../components/Media/Movie/FantasyMovieDetails";
import { MediaContext } from "../contexts/mediaContext";

const FantasyMoviePage: React.FC = () => {
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
        poster: null,
        productionCompany: "",
    });

    const { saveFantasyMovie } = useContext(MediaContext);

    const handleFormChange = (field: keyof FantasyMovieFormData, value: any) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const handleSaveMovie = async () => {
        try {
            await saveFantasyMovie(formData);
            alert("Fantasy movie saved successfully!");
        } catch (error) {
            console.error("Error saving fantasy movie:", error);
            alert("Failed to save fantasy movie.");
        }
    };

    return (
        <Grid container spacing={4}>
            {/* Form Column */}
            <Grid item xs={12} md={6}>
                <FantasyMovieForm formData={formData} onChange={handleFormChange} />
            </Grid>

            {/* Preview Column */}
            <Grid item xs={12} md={6}>
                <FantasyMovieDetails movie={formData} />
            </Grid>

            {/* Save Button */}
            <Grid item xs={12}>
                <Box display="flex" justifyContent="center" mt={4}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSaveMovie}
                    >
                        Save Fantasy Movie
                    </Button>
                </Box>
            </Grid>
        </Grid>
    );
};

export default FantasyMoviePage;
