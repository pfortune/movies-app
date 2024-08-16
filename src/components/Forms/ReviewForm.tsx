import React, { useContext, useState, ChangeEvent } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { MediaContext } from "../../contexts/mediaContext";
import { useNavigate } from "react-router-dom";
import styles from "./styles";
import ratings from "./RatingCategories";
import { BaseMovieProps, Review } from "../../types/interfaces";

interface ReviewFormProps {
    movie: BaseMovieProps;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ movie }) => {
    const defaultValues = {
        author: "",
        content: "",
        agree: false,
        rating: 3,
        movieId: movie.id,
    };

    const {
        control,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm<Review>({ defaultValues });

    const navigate = useNavigate();
    const context = useContext(MediaContext);
    const [rating, setRating] = useState(defaultValues.rating);

    const handleRatingChange = (event: ChangeEvent<HTMLInputElement>) => {
        setRating(Number(event.target.value));
    };

    const onSubmit: SubmitHandler<Review> = (review) => {
        review.movieId = movie.id;
        review.rating = rating;
        context.addReview(movie, review);
        navigate(`/movies/${movie.id}`);
    };

    return (
        <Box component="div" sx={styles.root}>
            <Typography component="h2" variant="h3">
                Write a review
            </Typography>
            <form style={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
                <Controller
                    name="author"
                    control={control}
                    rules={{ required: "Name is required" }}
                    defaultValue=""
                    render={({ field: { onChange, value } }) => (
                        <TextField
                            sx={{ width: "40ch" }}
                            variant="outlined"
                            margin="normal"
                            required
                            onChange={onChange}
                            value={value}
                            id="author"
                            label="Author's name"
                            autoFocus
                        />
                    )}
                />
                {errors.author && (
                    <Typography variant="h6" component="p">
                        {errors.author.message}
                    </Typography>
                )}
                <Controller
                    name="content"
                    control={control}
                    rules={{
                        required: "Review cannot be empty.",
                        minLength: { value: 10, message: "Review is too short" },
                    }}
                    defaultValue=""
                    render={({ field: { onChange, value } }) => (
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            value={value}
                            onChange={onChange}
                            label="Review text"
                            id="review"
                            multiline
                            minRows={10}
                        />
                    )}
                />
                {errors.content && (
                    <Typography variant="h6" component="p">
                        {errors.content.message}
                    </Typography>
                )}

                <TextField
                    id="select-rating"
                    select
                    variant="outlined"
                    label="Rating Select"
                    value={rating}
                    onChange={handleRatingChange}
                    helperText="Don't forget your rating"
                >
                    {ratings.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>

                <Box>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={styles.submit}
                    >
                        Submit
                    </Button>
                    <Button
                        type="reset"
                        variant="contained"
                        color="secondary"
                        sx={styles.submit}
                        onClick={() => {
                            reset({
                                author: "",
                                content: "",
                                rating: 3,
                            });
                        }}
                    >
                        Reset
                    </Button>
                </Box>
            </form>
        </Box>
    );
};

export default ReviewForm;
