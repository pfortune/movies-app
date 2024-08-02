import type { Meta, StoryObj } from '@storybook/react';
import MovieCard from "../components/Media/Movie/MovieCard";
import SampleMovie from "./sampleData";
import { StaticRouter } from "react-router-dom/server";
import MediaContextProvider from "../contexts/mediaContext";
import AddToFavouritesIcon from "../components/Media/CardIcons/AddToFavourites";

const meta = {
  title: 'Home Page/MovieCard',
  component: MovieCard,
  decorators: [
    (Story) => (
      <StaticRouter location="/">
        <MediaContextProvider>
          {Story()}
        </MediaContextProvider>
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
