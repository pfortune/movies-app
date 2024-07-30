import React from "react";
import { useLocation } from "react-router-dom";
import PageTemplate from "../components/Templates/TemplateMoviePage";
import MovieReview from "../components/Media/Movie/MovieReview";

const MovieReviewPage: React.FC = () => {
    const { state: { movie, review } } = useLocation()
    return (
        <PageTemplate movie={movie}>
            <MovieReview {...review} />
        </PageTemplate>
    );
};

export default MovieReviewPage;