import type { Meta, StoryObj } from '@storybook/react';
import MovieHeader from "../components/Header/MovieHeader";
import SampleMovie from "./sampleData";
import { MemoryRouter } from "react-router";

import React from 'react';

const meta = {
    title: "Movie Details Page/MovieHeader",
    component: MovieHeader,
    decorators: [
        (Story: React.FC) => <MemoryRouter initialEntries={["/"]}><Story /></MemoryRouter>,
    ],
} satisfies Meta<typeof MovieHeader>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Basic: Story = {
    args: {
        ...SampleMovie
    }
};
Basic.storyName = "Default";