import React, { ChangeEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SortIcon from '@mui/icons-material/Sort';
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { FilterOption, GenreData } from "../../types/interfaces";
import Spinner from "../spinner";
import { getGenres } from "../../api/tmdb-api";

const styles = {
  root: {
    maxWidth: 400,
    padding: '16px',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
    borderRadius: '12px',
    backgroundColor: '#f5f5f5',
  },
  formControl: {
    margin: '16px 0',
    minWidth: 240,
    borderRadius: '8px',
    backgroundColor: "white",
  },
  inputLabel: {
    fontSize: '1rem',
    color: '#555',
  },
  textField: {
    borderRadius: '8px',
  },
  icon: {
    marginRight: '8px',
    color: '#777',
  },
  button: {
    marginTop: '16px',
    width: '100%',
    borderRadius: '10px',
    background: 'linear-gradient(45deg, #1565c0, #42a5f5)',
    color: '#ffffff',
    fontWeight: 700,
    '&:hover': {
      background: 'linear-gradient(45deg, #0d47a1, #1e88e5)',
    },
  },
};

interface FilterMoviesCardProps {
  onUserInput: (f: FilterOption, s: string) => void;
  titleFilter: string;
  genreFilter: string;
}

const FilterMoviesCard: React.FC<FilterMoviesCardProps> = ({ titleFilter, genreFilter, onUserInput }) => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["genres"],
    queryFn: getGenres,
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{(error as Error).message}</h1>;
  }

  const genres = data || [];
  if (!genres.some((genre: GenreData['genres'][number]) => genre.id === "0")) {
    genres.unshift({ id: "0", name: "All" });
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement> | SelectChangeEvent, type: FilterOption, value: string) => {
    e.preventDefault();
    onUserInput(type, value);
  };

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(e, "title", e.target.value);
  };

  const handleGenreChange = (e: SelectChangeEvent) => {
    handleChange(e, "genre", e.target.value);
  };

  const handleReset = () => {
    onUserInput("title", "");
    onUserInput("genre", "0");
  };

  return (
    <Card sx={styles.root} variant="outlined">
      <CardContent>
        <TextField
          sx={{ ...styles.formControl, ...styles.textField }}
          id="filled-search"
          label="Search Movies"
          type="search"
          value={titleFilter}
          variant="outlined"
          onChange={handleTextChange}
          InputProps={{
            startAdornment: (
              <FilterAltIcon sx={styles.icon} />
            ),
          }}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center'
          }}
        >
          <FormControl sx={styles.formControl}>
            <InputLabel id="genre-label" sx={styles.inputLabel}>Genre</InputLabel>
            <Select
              labelId="genre-label"
              id="genre-select"
              value={genreFilter}
              onChange={handleGenreChange}
              startAdornment={<SortIcon sx={styles.icon} />}
            >
              {genres.map((genre: GenreData['genres'][number]) => (
                <MenuItem key={genre.id} value={genre.id}>
                  {genre.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            sx={styles.button}
            onClick={handleReset}
          >
            Reset
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default FilterMoviesCard;