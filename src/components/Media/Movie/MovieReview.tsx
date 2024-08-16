import React from "react";
import { Review } from "../../../types/interfaces";
import { Card, CardContent, Typography, Avatar, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import StarIcon from "@mui/icons-material/Star";

const MovieReview: React.FC<Review> = (props) => {
    const theme = useTheme();

    return (
        <Card sx={{ maxWidth: 800, margin: "20px auto", padding: theme.spacing(2) }}>
            <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", marginBottom: theme.spacing(2) }}>
                    <Avatar sx={{ backgroundColor: theme.palette.primary.main, marginRight: theme.spacing(2) }}>
                        {props.author.charAt(0).toUpperCase()}
                    </Avatar>
                    <Typography variant="h6" component="div">
                        {props.author}
                    </Typography>
                </Box>
                <Typography variant="body1" component="p" sx={{ marginBottom: theme.spacing(2) }}>
                    {props.content}
                </Typography>
                {props.rating !== undefined && (
                    <Box sx={{ display: "flex", alignItems: "center", marginTop: theme.spacing(2) }}>
                        <StarIcon sx={{ color: theme.palette.secondary.main, marginRight: theme.spacing(1) }} />
                        <Typography variant="body2" component="p">
                            Rating: {props.rating} / 5
                        </Typography>
                    </Box>
                )}
            </CardContent>
        </Card>
    );
};

export default MovieReview;
