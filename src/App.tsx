import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  Chip,
  Avatar,
  IconButton,
  Fab,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Switch,
  FormControlLabel,
  Alert,
  Snackbar
} from '@mui/material';
import {
  Home as HomeIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  Add as AddIcon,
  Notifications as NotificationsIcon,
  Search as SearchIcon,
  Menu as MenuIcon
} from '@mui/icons-material';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
  const [darkMode, setDarkMode] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleFavoriteClick = () => {
    setOpenSnackbar(true);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* App Bar */}
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MD-4 Demo App
          </Typography>
          <IconButton color="inherit">
            <SearchIcon />
          </IconButton>
          <IconButton color="inherit">
            <NotificationsIcon />
          </IconButton>
          <IconButton color="inherit">
            <PersonIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {/* Welcome Section */}
        <Paper elevation={3} sx={{ p: 3, mb: 3, textAlign: 'center' }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Welcome to MD-4 Demo
          </Typography>
          <Typography variant="h6" color="text.secondary" paragraph>
            This is a Material-UI boilerplate showcasing various components and layouts
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Chip label="React" color="primary" sx={{ mr: 1 }} />
            <Chip label="TypeScript" color="secondary" sx={{ mr: 1 }} />
            <Chip label="Material-UI" color="success" sx={{ mr: 1 }} />
            <Chip label="Vite" color="info" />
          </Box>
        </Paper>

        {/* Settings Section */}
        <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Settings
          </Typography>
          <FormControlLabel
            control={
              <Switch
                checked={darkMode}
                onChange={(e) => setDarkMode(e.target.checked)}
              />
            }
            label="Dark Mode"
          />
        </Paper>

        {/* Cards Grid */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3, mb: 3 }}>
          {/* Feature Card 1 */}
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                <HomeIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Home
              </Typography>
              <Typography variant="body2" color="text.secondary">
                This is the main dashboard of your application. Here you can see all the important information at a glance.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary">
                Learn More
              </Button>
              <Button size="small" color="primary">
                Share
              </Button>
            </CardActions>
          </Card>

          {/* Feature Card 2 */}
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                <PersonIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Profile
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Manage your user profile, preferences, and account settings. Keep your information up to date.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary">
                Edit Profile
              </Button>
              <Button size="small" color="primary">
                View Details
              </Button>
            </CardActions>
          </Card>

          {/* Feature Card 3 */}
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                <SettingsIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Settings
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Configure your application settings, notifications, and other preferences to customize your experience.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary">
                Configure
              </Button>
              <Button size="small" color="primary">
                Advanced
              </Button>
            </CardActions>
          </Card>
        </Box>

        {/* Sample List */}
        <Paper elevation={2} sx={{ mt: 3, p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Recent Activities
          </Typography>
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="User login successful"
                secondary="2 minutes ago"
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <SettingsIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Settings updated"
                secondary="1 hour ago"
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <HomeIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Dashboard accessed"
                secondary="3 hours ago"
              />
            </ListItem>
          </List>
        </Paper>


      </Container>

      {/* Floating Action Button */}
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={handleFavoriteClick}
      >
        <AddIcon />
      </Fab>

      {/* Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Action completed successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default App;
