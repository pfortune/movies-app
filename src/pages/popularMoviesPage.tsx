import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageTemplate from '../components/Templates/TemplateMovieListPage';
import { BaseMovieProps, DiscoverMovies } from "../types/interfaces";
import { getPopularMovies } from "../api/tmdb-api";
import AddToPlaylistIcon from '../components/Media/CardIcons/AddToPlaylist';
import AddToFavouritesIcon from "../components/Media/CardIcons/AddToFavourites";
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/UI/Spinner';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';

const PopularMoviesPage: React.FC = () => {
    const { page } = useParams<{ page: string }>();
    const navigate = useNavigate();
    const currentPage = page ? parseInt(page, 10) : 1;

    const { data, error, isLoading, isError } = useQuery<DiscoverMovies, Error>({
        queryKey: ['popular', currentPage],
        queryFn: () => getPopularMovies(currentPage),
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
    });

    const movies = data?.results || [];

    const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
        navigate(`/movies/popular/page/${value}`);
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
                title='Popular Movies'
                movies={movies}
                action={(movie: BaseMovieProps) => (
                    <>
                        <AddToPlaylistIcon {...movie} />
                        <AddToFavouritesIcon movie={movie} />
                    </>
                )}
            />

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 4 }}>
                <Pagination
                    count={data?.total_pages}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                />
            </Box>
        </>
    );
};

export default React.memo(PopularMoviesPage);
