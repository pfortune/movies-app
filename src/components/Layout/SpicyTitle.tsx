import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

// Styled component for the title with gradient
const SpicyTitle = styled(Typography)(({ theme }) => ({
    background: 'linear-gradient(45deg, #FF6B6B, #FFD93D)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontSize: '1.8rem',
    fontWeight: 700,
    textAlign: 'center',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
}));

export default SpicyTitle;
