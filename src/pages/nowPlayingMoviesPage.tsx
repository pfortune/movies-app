import React from "react";
import PageTemplate from "../components/Templates/TemplateMovieListPage";
import { BaseMovieProps, DiscoverMovies } from "../types/interfaces";
import { getNowPlayingMovies } from "../api/tmdb-api";
import AddToPlaylistIcon from "../components/Media/CardIcons/AddToPlaylist";
import AddToFavouritesIcon from "../components/Media/CardIcons/AddToFavourites";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "../components/UI/Spinner";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";

const NowPlayingMoviesPage: React.FC = () => {
    const { page } = useParams<{ page: string }>();
    const currentPage = parseInt(page || "1", 10);
    const navigate = useNavigate();

    const { data, error, isLoading, isError } = useQuery<DiscoverMovies, Error>({
        queryKey: ["nowPlaying", currentPage],
        queryFn: () => getNowPlayingMovies(currentPage),
        staleTime: 1000 * 60 * 5, // 5 minutes
        refetchOnWindowFocus: false,
    });

    const movies = data?.results || [];

    const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
        navigate(`/movies/now-playing/page/${value}`);
    };

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>Error: {error.message}</h1>;
    }

    return (
        <>
            <PageTemplate
                title="Now Playing Movies"
                movies={movies}
                action={(movie: BaseMovieProps) => (
                    <>
                        <AddToPlaylistIcon {...movie} />
                        <AddToFavouritesIcon movie={movie} />
                    </>
                )}
            />
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4, mb: 4 }}>
                <Pagination
                    count={data?.total_pages || 1}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                />
            </Box>
        </>
    );
};

export default React.memo(NowPlayingMoviesPage);
