import type { Meta, StoryObj } from '@storybook/react';
import MovieListHeader from "../components/headerMovieList";
import { MemoryRouter } from "react-router";
import MoviesContextProvider from "../contexts/moviesContext";

const meta: Meta<typeof MovieListHeader> = {
  title: 'Home Page/Header',
  component: MovieListHeader,
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
  args: { title: 'Discover Movies' },
};

Basic.storyName = "Default";
