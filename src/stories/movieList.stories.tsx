import type { Meta } from '@storybook/react';
import MovieList from "../components/Media/Movie/MovieList";
import SampleMovie from "./sampleData";
import { StaticRouter } from "react-router-dom/server";
import AddToFavouritesIcon from "../components/Media/CardIcons/AddToFavourites";
import Grid from "@mui/material/Grid";
import MediaContextProvider from "../contexts/mediaContext";

const meta = {
  title: "Home Page/MovieList",
  component: MovieList,
  decorators: [
    (Story) => (
      <StaticRouter location="/">
        <MediaContextProvider>
          {Story()}
        </MediaContextProvider>
      </StaticRouter>
    ),
  ],
} satisfies Meta<typeof MovieList>;

export default meta;

export const Basic = () => {
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
};
Basic.storyName = "Default";
