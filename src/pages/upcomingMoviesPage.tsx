import React, { useMemo, useState, useCallback } from 'react';
import PageTemplate from '../components/Templates/TemplateMovieListPage';
import { BaseMovieProps } from "../types/interfaces";
import { getUpcomingMovies } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import AddToPlaylistIcon from '../components/Media/CardIcons/AddToPlaylist';
import MovieFilterUI, {
    titleFilter,
    genreFilter,
} from "../components/Media/Movie/MovieFilterUI";
import { DiscoverMovies } from '../types/interfaces';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/UI/Spinner';

const titleFiltering = {
    name: "title",
    value: "",
    condition: titleFilter,
};

const genreFiltering = {
    name: "genre",
    value: "0",
    condition: genreFilter,
};

const UpcomingMoviesPage: React.FC = () => {
    const [startYearFilter, setStartYearFilter] = useState<string>("");
    const [endYearFilter, setEndYearFilter] = useState<string>("");

    const { filterValues, setFilterValues } = useFiltering(
        [titleFiltering, genreFiltering]
    );

    const stableFilters = useMemo(() => ({
        startYear: startYearFilter,
        endYear: endYearFilter,
        genre: filterValues[1].value,
    }), [startYearFilter, endYearFilter, filterValues]);

    const { data, error, isLoading, isError } = useQuery<DiscoverMovies, Error>({
        queryKey: ['upcoming', stableFilters],
        queryFn: () => getUpcomingMovies({ filters: stableFilters }),
        staleTime: 1000 * 60 * 10, // Keep data fresh for 10 minutes
        gcTime: 1000 * 60 * 30, // Keep data in cache for 30 minutes
        refetchOnWindowFocus: false,
    });

    const changeFilterValues = useCallback((type: string, value: string) => {
        if (type === "startYear") {
            setStartYearFilter(value);
        } else if (type === "endYear") {
            setEndYearFilter(value);
        } else {
            const changedFilter = { name: type, value: value };
            const updatedFilterSet =
                type === 'title'
                    ? [changedFilter, filterValues[1]]
                    : [filterValues[0], changedFilter];
            setFilterValues(updatedFilterSet);
        }
    }, [filterValues, setFilterValues]);

    const displayedMovies = useMemo(() => data?.results || [], [data]);

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>Error: {error.message}</h1>;
    }

    return (
        <>
            <PageTemplate
                title='Upcoming Movies'
                movies={displayedMovies}
                action={(movie: BaseMovieProps) => <AddToPlaylistIcon {...movie} />}
            />
            <MovieFilterUI
                onFilterValuesChange={changeFilterValues}
                titleFilter={filterValues[0].value}
                genreFilter={filterValues[1].value}
                startYearFilter={startYearFilter}
                endYearFilter={endYearFilter}
            />
        </>
    );
};

export default React.memo(UpcomingMoviesPage);
