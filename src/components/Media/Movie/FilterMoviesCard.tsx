import React, { ChangeEvent } from "react";
import { SelectChangeEvent } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { FilterOption, GenreData } from "../../../types/interfaces";
import { getGenres } from "../../../api/tmdb-api";
import { useQuery } from "@tanstack/react-query";
import Spinner from '../../UI/Spinner';

const styles = {
    root: {
        maxWidth: 345,
        backgroundColor: "#1a1a1a",
        color: "white",
    },
    media: { height: 300 },

    formControl: {
        margin: 1,
        minWidth: 220,
        color: "white",
        backgroundColor: "#1a1a1a",
        border: '1px solid white',
    },
};

// Define the prop types
interface FilterMoviesCardProps {
    onUserInput: (f: string, s: string) => void;
    titleFilter: string;
    genreFilter: string;
}

const FilterMoviesCard: React.FC<FilterMoviesCardProps> = ({ titleFilter, genreFilter, onUserInput }) => {
    const { data, error, isLoading, isError } = useQuery<GenreData, Error>({
        queryKey: ['genres'], // Use an array for the query key
        queryFn: getGenres,    // Provide the function to fetch data
    });

    if (isLoading) {
        return <Spinner />;
    }
    if (isError) {
        return <h1>{(error as Error).message}</h1>;
    }
    const genres = data?.genres || [];
    if (genres[0].name !== "All") {
        genres.unshift({ id: "0", name: "All" });
    }

    const handleChange = (e: SelectChangeEvent, type: FilterOption) => {
        onUserInput(type, e.target.value);
    };

    const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
        handleChange(e as any, "title");
    }

    const handleGenreChange = (e: SelectChangeEvent) => {
        handleChange(e, "genre");
    };

    return (
        <Card sx={styles.root} variant="outlined">
            <CardContent>

                <InputLabel id="filled-search" sx={{ color: "white", paddingLeft: "10px" }}>Search</InputLabel>
                <TextField
                    sx={styles.formControl}
                    id="filled-search"
                    label="Title"
                    type="search"
                    value={titleFilter}
                    variant="filled"
                    onChange={handleTextChange}
                    InputLabelProps={{ style: { color: 'white' } }}
                />
                <InputLabel id="genre-label" sx={{ color: "white", paddingLeft: "10px" }}>Genre</InputLabel>
                <FormControl sx={styles.formControl}>
                    <Select
                        labelId="genre-label"
                        id="genre-select"
                        value={genreFilter}
                        onChange={handleGenreChange}
                        variant="filled"
                        sx={{
                            backgroundColor: "#1a1a1a", color: "white",
                            "& .MuiSelect-icon": {
                                color: "white",
                            },
                        }}
                    >
                        {genres.map((genre) => {
                            return (
                                <MenuItem key={genre.id} value={genre.id}>
                                    {genre.name}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
            </CardContent>
        </Card>
    );
};

export default FilterMoviesCard;
