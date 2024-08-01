import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { BaseTVShowProps } from "../../../types/interfaces";
import img from '../../../images/film-poster-placeholder.png';

interface TVShowCardProps {
    tvShow: BaseTVShowProps;
    action: (tvShow: BaseTVShowProps) => React.ReactNode;
}

const TVShowCard: React.FC<TVShowCardProps> = ({ tvShow, action }) => {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                height="500"
                image={
                    tvShow.poster_path
                        ? `https://image.tmdb.org/t/p/w500/${tvShow.poster_path}`
                        : img
                }
                alt={tvShow.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {tvShow.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {tvShow.overview}
                </Typography>
                {action(tvShow)}
            </CardContent>
        </Card>
    );
};

export default TVShowCard;

