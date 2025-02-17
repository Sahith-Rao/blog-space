import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, Box, IconButton } from '@mui/material';
import { AccessTime, Person } from '@mui/icons-material';

export default function Post({ _id, title, summary, cover, createdAt, author }) {
    return (
        <Card
            sx={{
                maxWidth: 600,
                margin: '20px auto',
                borderRadius: 4,
                boxShadow: 3,
                transition: '0.3s',
                '&:hover': { boxShadow: 6 },
            }}
        >
            {/* Image Section */}
            <Link to={`/post/${_id}`} style={{ textDecoration: 'none' }}>
                <CardMedia
                    component="img"
                    height="250"
                    image={`http://localhost:4000/${cover}`}
                    alt={title}
                    sx={{
                        borderTopLeftRadius: 4,
                        borderTopRightRadius: 4,
                        objectFit: 'cover',
                    }}
                />
            </Link>

            {/* Text Section */}
            <CardContent sx={{ padding: 3 }}>
                {/* Title with black color */}
                <Link to={`/post/${_id}`} style={{ textDecoration: 'none' }}>
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 'bold',
                            color: 'black', // Changed to black
                            marginBottom: 1,
                            transition: 'color 0.3s',
                            '&:hover': {
                                color: '#333', // Slightly darker black on hover
                            },
                        }}
                    >
                        {title}
                    </Typography>
                </Link>

                {/* Author and Date Info */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: 2 }}>
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
                </Box>

                {/* Summary */}
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ marginBottom: 1.5, lineHeight: 1.6 }}
                >
                    {summary}
                </Typography>
            </CardContent>
        </Card>
    );
}