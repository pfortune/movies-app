import React from "react";
import PageTemplate from "../components/Templates/TemplateMoviePage";
import ReviewForm from "../components/Forms/ReviewForm";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/UI/Spinner";
import { MovieDetailsProps } from "../types/interfaces";

interface LocationState {
    movieId: number;
}

const WriteReviewPage: React.FC = () => {
    const location = useLocation();
    const { movieId } = location.state as LocationState; // Type assertion for safety

    const { data: movie, error, isLoading, isError } = useQuery<MovieDetailsProps, Error>({
        queryKey: ["movie", movieId],
        queryFn: () => getMovie(movieId.toString()), // Convert movieId to string
    });

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }

    return (
        <>
            {movie ? (
                <PageTemplate movie={movie}>
                    <ReviewForm movie={movie} />
                </PageTemplate>
            ) : (
                <p>Waiting for movie review details</p>
            )}
        </>
    );
};

export default WriteReviewPage;
