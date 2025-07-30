import React from 'react';
import { Box, AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { LocationOn as LocationIcon } from '@mui/icons-material';
import Weather from './components/Weather';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* App Bar */}
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="location"
            sx={{ mr: 2 }}
          >
            <LocationIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Toronto Weather App
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Weather Component */}
      <Weather />
    </Box>
  );
}

export default App;
