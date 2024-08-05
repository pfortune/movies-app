import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Container, Button, Typography } from '@mui/material';
import { GitHub as GitHubIcon } from '@mui/icons-material';
import Spinner from '../components/UI/Spinner';
import SpicyTitle from '../components/Layout/SpicyTitle';

const LoginPage = () => {
    const { authenticate, loading } = useAuth();
    const [error, setError] = useState<string | null>(null);;

    const handleLogin = async () => {
        try {
            await authenticate();
        } catch (err) {
            setError('Failed to log in. Please try again.');
        }
    };

    return (
        <Container
            maxWidth="sm"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
                paddingY: 4,
                justifyContent: 'center',
                alignItems: 'center',
                background: 'linear-gradient(135deg, #ece9e6 0%, #ffffff 100%)',
                borderRadius: 2,
                boxShadow: 3,
                marginTop: 8,
            }}
        >
            {/* Title */}
            <SpicyTitle>
                Login
            </SpicyTitle>

            <Typography variant="body1" align="center" sx={{ marginBottom: 2 }}>
                Please log in with your GitHub account to unlock access to favourites, playlists, and fantasy movie features.
            </Typography>

            {error && (
                <Typography variant="body2" color="error" align="center">
                    {error}
                </Typography>
            )}

            {loading ? (
                <Spinner />
            ) : (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleLogin}
                    sx={{ padding: '10px 20px', fontSize: '16px', display: 'flex', alignItems: 'center' }}
                    startIcon={<GitHubIcon />}
                    disabled={loading}
                >
                    Log in with GitHub
                </Button>
            )}
        </Container>
    );
};

export default LoginPage;
