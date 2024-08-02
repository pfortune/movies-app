import type { Meta, StoryObj } from '@storybook/react';
import MovieDetails from "../components/Media/Movie/MovieDetails";
import SampleMovie from "./sampleData";
import { MemoryRouter } from "react-router";
import MediaContextProvider from "../contexts/mediaContext";

const meta = {
    title: "Movie Details Page/MovieDetails",
    component: MovieDetails,
    decorators: [
        (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
        (Story) => <MediaContextProvider>{Story()}</MediaContextProvider>,
    ],
} satisfies Meta<typeof MovieDetails>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Basic: Story = {
    args: SampleMovie
};
Basic.storyName = "Default";