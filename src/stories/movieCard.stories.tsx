import type { Meta, StoryObj } from '@storybook/react';
import MovieCard from "../components/Media/Movie/MovieCard";
import SampleMovie from "./sampleData";
import { StaticRouter } from "react-router-dom/server";
import MoviesContextProvider from "../contexts/moviesContext";
import AddToFavouritesIcon from "../components/Media/CardIcons/AddToFavourites";

const meta = {
  title: 'Home Page/MovieCard',
  component: MovieCard,
  decorators: [
    (Story) => (
      <StaticRouter location="/">
        <MoviesContextProvider>
          {Story()}
        </MoviesContextProvider>
      </StaticRouter>
    ),
  ],
} satisfies Meta<typeof MovieCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    action: (movie) => <AddToFavouritesIcon movie={movie} />,
    movie: SampleMovie,
  },
};
Basic.storyName = "Default";

const sampleNoPoster = { ...SampleMovie, poster_path: undefined };
export const Exceptional: Story = {
  args: {
    movie: sampleNoPoster,
    action: (movie) => <AddToFavouritesIcon movie={movie} />,
  },
};
Exceptional.storyName = "Exception";
