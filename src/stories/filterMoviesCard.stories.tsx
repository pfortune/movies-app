import type { Meta, StoryObj } from '@storybook/react';
import FilterMoviesCard from "../components/filterMoviesCard";
import { MemoryRouter } from "react-router";
import { action } from "@storybook/addon-actions";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";  // Ensure this import is from "@tanstack/react-query"
import React from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false,
    },
  },
});

const withMemoryRouter = (Story: React.ElementType) => (
  <MemoryRouter initialEntries={["/"]}>
    <Story />
  </MemoryRouter>
);

const withQueryClientProvider = (Story: React.ElementType) => (
  <QueryClientProvider client={queryClient}>
    <Story />
  </QueryClientProvider>
);

const meta = {
  title: 'Home Page/FilterMoviesCard',
  component: FilterMoviesCard,
  decorators: [withMemoryRouter, withQueryClientProvider],
} satisfies Meta<typeof FilterMoviesCard>;

export default meta;

type Story = StoryObj<typeof FilterMoviesCard>;

export const Basic: Story = {
  args: {
    onUserInput: action("filter input"),
    titleFilter: "",
    genreFilter: "All",
  },
};

Basic.storyName = "Default";
