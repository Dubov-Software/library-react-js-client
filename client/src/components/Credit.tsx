import { Typography } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
const credits = () => {
    return (
        <Container sx={{ position: 'fixed', left: 0, bottom: 0, paddingY: 2}}>
            <Typography variant="body2">
                Created by <a href="https://github.com/alon-codes">Alon Dubov</a>
            </Typography>
        </Container>
    );
};

export default credits;