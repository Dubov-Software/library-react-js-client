import React from 'react';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';

const Header: React.FC = () => {
  return (
    <Stack spacing={1} columnGap={2} flexDirection="row" justifyContent="center" alignItems="center" justifyItems="center" alignContent="center">
      <Box>
        <img src="/books.png" height={75} />
      </Box>
      <Box>
        <Typography textAlign="center" fontWeight="bold" color="secondary" variant="h5">Books</Typography>
      </Box>
    </Stack>
  );
};

export default Header;
