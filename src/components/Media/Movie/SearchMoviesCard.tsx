import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import SortIcon from '@mui/icons-material/Sort';
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { FilterOption, GenreData } from "../../../types/interfaces";
import Spinner from "../../UI/Spinner";
import { getGenres } from "../../../api/tmdb-api";

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
  genreFilter: string;
  startYearFilter: string;
  endYearFilter: string;
}

const FilterMoviesCard: React.FC<FilterMoviesCardProps> = ({
  genreFilter,
  startYearFilter,
  endYearFilter,
  onUserInput
}) => {
  const [localGenreFilter, setLocalGenreFilter] = useState(genreFilter);
  const [localStartYearFilter, setLocalStartYearFilter] = useState(startYearFilter);
  const [localEndYearFilter, setLocalEndYearFilter] = useState(endYearFilter);

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["genres"],
    queryFn: getGenres,
  });

  useEffect(() => {
    console.log("Current filter values:");
    console.log("Genre Filter:", localGenreFilter);
    console.log("Start Year Filter:", localStartYearFilter);
    console.log("End Year Filter:", localEndYearFilter);
  }, [localGenreFilter, localStartYearFilter, localEndYearFilter]);

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

  const handleApplyFilters = () => {
    onUserInput("genre", localGenreFilter);
    onUserInput("startYear", localStartYearFilter);
    onUserInput("endYear", localEndYearFilter);
  };

  const handleReset = () => {
    setLocalGenreFilter("0");
    setLocalStartYearFilter("");
    setLocalEndYearFilter("");

    onUserInput("genre", "0");
    onUserInput("startYear", "");
    onUserInput("endYear", "");
  };

  return (
    <Card sx={styles.root} variant="outlined">
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center'
          }}
        >
          {/* Start Year Filter */}
          <TextField
            sx={{ ...styles.formControl, ...styles.textField }}
            id="start-year"
            label="Start Year"
            type="number"
            value={localStartYearFilter}
            variant="outlined"
            onChange={(e) => setLocalStartYearFilter(e.target.value)}
          />

          {/* End Year Filter */}
          <TextField
            sx={{ ...styles.formControl, ...styles.textField }}
            id="end-year"
            label="End Year"
            type="number"
            value={localEndYearFilter}
            variant="outlined"
            onChange={(e) => setLocalEndYearFilter(e.target.value)}
          />

          <FormControl sx={styles.formControl}>
            <InputLabel id="genre-label" sx={styles.inputLabel}>Genre</InputLabel>
            <Select
              labelId="genre-label"
              id="genre-select"
              value={localGenreFilter}
              onChange={(e) => setLocalGenreFilter(e.target.value)}
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
            onClick={handleApplyFilters}
          >
            Apply Filters
          </Button>

          <Button
            variant="contained"
            sx={{ ...styles.button, marginTop: '8px', backgroundColor: '#ffffff' }}
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
