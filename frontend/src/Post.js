import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, Box, IconButton } from '@mui/material';
import { AccessTime, Person } from '@mui/icons-material';
import styled from "@emotion/styled";

const StyledCard = styled(Card)`
    max-width: 600px;
    margin: 20px auto;
    border-radius: 12px; /* Increased border-radius for a smoother look */
    box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.15); /* Soft shadow effect */
    transition: 0.3s;
    &:hover {
        box-shadow: 0px 8px 25px rgba(0, 0, 0, 0.2); /* More prominent shadow on hover */
    }
`;

const StyledCardMedia = styled(CardMedia)`
    border-top-left-radius: 12px; /* Rounded corners for the image */
    border-top-right-radius: 12px;
    object-fit: cover;
`;

const StyledTypography = styled(Typography)`
    font-weight: bold;
    color: black;
    margin-bottom: 1rem;
    transition: color 0.3s;
    &:hover {
        color: #333;
    }
`;

const InfoBox = styled(Box)`
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 16px;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
`;

export default function Post({ _id, title, summary, cover, createdAt, author }) {
    return (
        <StyledCard>
            <StyledLink to={`/post/${_id}`}>
                <StyledCardMedia
                    component="img"
                    height="250"
                    image={`http://localhost:4000/${cover}`}
                    alt={title}
                />
            </StyledLink>

            <CardContent sx={{ padding: 3 }}>
                <StyledLink to={`/post/${_id}`}>
                    <StyledTypography variant="h5">
                        {title}
                    </StyledTypography>
                </StyledLink>

                <InfoBox>
                    <IconButton size="small" color="primary">
                        <Person fontSize="small" />
                    </IconButton>
                    <Typography variant="body2" color="text.secondary">
                        {author.username}
                    </Typography>
                    <IconButton size="small" color="primary">
                        <AccessTime fontSize="small" />
                    </IconButton>
                    <Typography variant="body2" color="text.secondary">
                        {format(new Date(createdAt), 'MMM d, yyyy')}
                    </Typography>
                </InfoBox>

                <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1.5, lineHeight: 1.6 }}>
                    {summary}
                </Typography>
            </CardContent>
        </StyledCard>
    );
}