import React, { useEffect, useState, useContext } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { getMovieReviews } from "../../../api/tmdb-api";
import { excerpt } from "../../../util";
import { MovieDetailsProps, Review } from "../../../types/interfaces";
import { MediaContext } from "../../../contexts/mediaContext";

const styles = {
    table: {
        minWidth: 550,
    },
    customReview: {
        backgroundColor: "#f0f0f0",
    },
};

const MovieReviews: React.FC<MovieDetailsProps> = (movie) => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const { getAllReviewsForMovie } = useContext(MediaContext);

    useEffect(() => {
        const fetchReviews = async () => {
            console.log("Fetching all reviews...");

            // Fetch TMDB reviews
            const apiReviews = await getMovieReviews(movie.id);
            console.log("TMDB reviews fetched:", apiReviews);

            // Fetch local reviews
            const localReviews = await getAllReviewsForMovie(movie.id);
            console.log("All local reviews fetched:", localReviews);

            // Combine and set reviews
            setReviews([...localReviews, ...apiReviews]);
        };

        fetchReviews();
    }, [movie.id, getAllReviewsForMovie]);

    return (
        <TableContainer component={Paper}>
            <Table sx={styles.table} aria-label="reviews table">
                <TableHead>
                    <TableRow>
                        <TableCell>Author</TableCell>
                        <TableCell align="center">Excerpt</TableCell>
                        <TableCell align="right">More</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {reviews.map((r: Review) => (
                        <TableRow key={r.id} sx={r.author === "You" ? styles.customReview : {}}>
                            <TableCell component="th" scope="row">
                                {r.author}
                            </TableCell>
                            <TableCell>{excerpt(r.content)}</TableCell>
                            <TableCell>
                                <Link
                                    to={`/reviews/${r.id}`}
                                    state={{
                                        review: r,
                                        movie: movie,
                                    }}
                                >
                                    Full Review
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default MovieReviews;
