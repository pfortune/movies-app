import React, { useState, useEffect, KeyboardEvent, ChangeEvent } from "react";
import {
    TextField,
    Box,
    Button,
    Typography,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Checkbox,
    FormControlLabel,
    Chip,
    Paper,
    SelectChangeEvent,
} from "@mui/material";
import { getGenres } from "../../api/tmdb-api";
import Spinner from "../UI/Spinner";
import { useQuery } from "@tanstack/react-query";

export interface FantasyMovieFormData {
    title: string;
    description: string;
    genreId: string;
    genreName: string;
    releaseDate: string;
    runtime: number | string;
    director: string;
    cast: string[];
    oscarWinner: boolean;
    posterFile: File | null;
    productionCompany: string;
}

interface FantasyMovieFormProps {
    formData: FantasyMovieFormData;
    onChange: (field: keyof FantasyMovieFormData, value: any) => void;
}

const FantasyMovieForm: React.FC<FantasyMovieFormProps> = ({ formData, onChange }) => {
    const [inputValue, setInputValue] = useState("");

    const { data: genres, error, isLoading, isError } = useQuery({
        queryKey: ["genres"],
        queryFn: getGenres,
    });

    useEffect(() => {
        if (genres && !formData.genreId) {
            const defaultGenre = genres[0];
            onChange("genreId", defaultGenre.id.toString());
            onChange("genreName", defaultGenre.name);
        }
    }, [genres, formData.genreId, onChange]);

    const handleRuntimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === "" || /^\d+$/.test(value)) {
            onChange("runtime", value);
        }
    };

    const handleCastKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "," || e.key === "Enter") {
            e.preventDefault();
            if (inputValue.trim() !== "") {
                onChange("cast", [...formData.cast, inputValue.trim()]);
                setInputValue("");
            }
        }
    };

    const handleDeleteChip = (chipToDelete: string) => () => {
        onChange(
            "cast",
            formData.cast.filter((chip) => chip !== chipToDelete)
        );
    };

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return (
            <Typography color="error">
                Failed to load genres: {(error as Error).message}
            </Typography>
        );
    }

    const handleGenreChange = (event: SelectChangeEvent<string>) => {
        const selectedGenreId = event.target.value;
        const selectedGenre = genres.find(
            (genre: { id: number; name: string }) => genre.id === parseInt(selectedGenreId)
        );
        if (selectedGenre) {
            onChange("genreId", selectedGenreId);
            onChange("genreName", selectedGenre.name);
        }
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        onChange("posterFile", file);
    };

    return (
        <Box component="form" sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Create Your Fantasy Movie
            </Typography>
            <TextField
                label="Title"
                value={formData.title}
                onChange={(e) => onChange("title", e.target.value)}
                fullWidth
                required
                margin="normal"
            />
            <TextField
                label="Description"
                value={formData.description}
                onChange={(e) => onChange("description", e.target.value)}
                fullWidth
                required
                margin="normal"
                multiline
                rows={4}
            />
            <FormControl fullWidth margin="normal">
                <InputLabel id="genre-label">Genre</InputLabel>
                <Select
                    labelId="genre-label"
                    id="genre-select"
                    value={formData.genreId}
                    onChange={handleGenreChange}
                >
                    {genres.map((genre: { id: number; name: string }) => (
                        <MenuItem key={genre.id} value={genre.id.toString()}>
                            {genre.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField
                label="Release Date"
                type="date"
                value={formData.releaseDate}
                onChange={(e) => onChange("releaseDate", e.target.value)}
                fullWidth
                required
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <TextField
                label="Runtime (minutes)"
                type="text"
                value={formData.runtime}
                onChange={handleRuntimeChange}
                fullWidth
                required
                margin="normal"
            />
            <TextField
                label="Director"
                value={formData.director}
                onChange={(e) => onChange("director", e.target.value)}
                fullWidth
                required
                margin="normal"
            />

            <TextField
                label="Cast"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleCastKeyDown}
                fullWidth
                margin="normal"
                placeholder="Enter actor's name and press Enter"
            />
            <Paper
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    listStyle: "none",
                    p: 1,
                    m: 0,
                    minHeight: "56px",
                }}
                component="ul"
            >
                {formData.cast.map((actor, index) => (
                    <li key={index}>
                        <Chip
                            label={actor}
                            onDelete={handleDeleteChip(actor)}
                            sx={{ margin: "4px" }}
                        />
                    </li>
                ))}
            </Paper>
            <Box margin="normal">
                <Button
                    variant="contained"
                    component="label"
                >
                    Choose Poster
                    <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </Button>
                {formData.posterFile && (
                    <Typography variant="body2" mt={2}>
                        {formData.posterFile.name}
                    </Typography>
                )}
            </Box>
            <TextField
                label="Production Company"
                value={formData.productionCompany}
                onChange={(e) => onChange("productionCompany", e.target.value)}
                fullWidth
                required
                margin="normal"
            />
            <FormControlLabel
                control={
                    <Checkbox
                        checked={formData.oscarWinner}
                        onChange={(e) => onChange("oscarWinner", e.target.checked)}
                    />
                }
                label="Won an Oscar"
            />
        </Box>
    );
};

export default FantasyMovieForm;
