import React from "react";
import { Paper, Typography, Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';

const styles = {
    root: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px",
        marginBottom: "16px",
        backgroundColor: "#f5f5f5",
    },
    title: {
        flexGrow: 1,
        textAlign: "center",
    },
};

interface FantasyMovieHeaderProps {
    title: string;
    showCreateLink?: boolean;
    showListLink?: boolean;
}

const FantasyMovieHeader: React.FC<FantasyMovieHeaderProps> = ({ title, showCreateLink, showListLink }) => {
    const navigate = useNavigate();

    return (
        <Paper component="div" sx={styles.root}>
            {showListLink && (
                <Button variant="outlined" color="primary" onClick={() => navigate("/fantasy-movies")}>
                    Fantasy Movies
                </Button>
            )}

            <Typography variant="h4" component="h3" sx={styles.title}>
                {title}
            </Typography>

            {showCreateLink && (
                <Button variant="outlined" color="primary" onClick={() => navigate("/fantasy-movie")}>
                    Create Fantasy Movie
                </Button>
            )}
        </Paper>
    );
};

export default FantasyMovieHeader;
