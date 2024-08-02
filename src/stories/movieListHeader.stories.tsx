import type { Meta, StoryObj } from '@storybook/react';
import MovieListHeader from "../components/Header/Movie/MovieListHeader";
import { MemoryRouter } from "react-router";
import MediaContextProvider from "../contexts/mediaContext";

const meta = {
  title: 'Home Page/Header',
  component: MovieListHeader,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => <MediaContextProvider>{Story()}</MediaContextProvider>,
  ],
} satisfies Meta<typeof MovieListHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: { title: 'Discover Movies' }

};
Basic.storyName = "Default";

