import type { Meta, StoryObj } from '@storybook/react';
import MovieList from "../components/movieList";
import SampleMovie from "./sampleData";
import { MemoryRouter } from "react-router";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import Grid from "@mui/material/Grid";
import MoviesContextProvider from "../contexts/moviesContext";

const meta: Meta<typeof MovieList> = {
  title: "Home Page/MovieList",
  component: MovieList,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={["/"]}>
        <MoviesContextProvider>
          <Story />
        </MoviesContextProvider>
      </MemoryRouter>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => {
    const movies = [
      { ...SampleMovie, id: 1 },
      { ...SampleMovie, id: 2 },
      { ...SampleMovie, id: 3 },
      { ...SampleMovie, id: 4 },
      { ...SampleMovie, id: 5 },
    ];

    return (
      <Grid container spacing={5}>
        <MovieList
          movies={movies}
          action={(movie) => <AddToFavouritesIcon movie={movie} />}
        />
      </Grid>
    );
  },
};

Basic.storyName = "Default";
