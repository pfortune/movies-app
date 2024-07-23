import type { Meta, StoryObj } from '@storybook/react';
import MovieDetails from "../components/movieDetails";
import SampleMovie from "./sampleData";
import { MemoryRouter } from "react-router";
import MoviesContextProvider from "../contexts/moviesContext";

const meta: Meta<typeof MovieDetails> = {
    title: "Movie Details Page/MovieDetails",
    component: MovieDetails,
    decorators: [
        (Story) => (
            <MemoryRouter initialEntries={["/"]}>
                <MoviesContextProvider>
                    {Story()}
                </MoviesContextProvider>
            </MemoryRouter>
        ),
    ],
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: SampleMovie,
};
Basic.storyName = "Default";
