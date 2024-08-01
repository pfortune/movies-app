import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPopularTVShows } from "../api/tmdb-api";
import Spinner from "../components/UI/Spinner";
import { BaseTVShowProps } from "../types/interfaces";
import TVShowListPageTemplate from "../components/Templates/TemplateTVShowsListPage";
import AddToPlaylistIcon from '../components/Media/CardIcons/AddToPlaylist';

const PopularTVShowsPage: React.FC = () => {
    const { data, error, isLoading, isError } = useQuery<BaseTVShowProps[]>({
        queryKey: ["popularTVShows"],
        queryFn: getPopularTVShows,
        staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
        refetchOnWindowFocus: false,
    });

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>Error: {error.message}</h1>;
    }

    return (
        <>
            <TVShowListPageTemplate
                title="Popular TV Shows"
                tvShows={data || []}
                action={(tvShow: BaseTVShowProps) => <AddToPlaylistIcon {...tvShow} />}
            />
        </>
    );
};

export default PopularTVShowsPage;
