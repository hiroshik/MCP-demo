import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  CircularProgress,
  Alert,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import {
  WbSunny as SunnyIcon,
  Cloud as CloudIcon,
  Opacity as RainIcon,
  AcUnit as SnowIcon,
  Thunderstorm as StormIcon,
  LocationOn as LocationIcon,
  Air as WindIcon,
  Visibility as VisibilityIcon,
  WaterDrop as HumidityIcon
} from '@mui/icons-material';

interface WeatherData {
  current: {
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    precipitation: number;
    weather_code: number;
    wind_speed_10m: number;
    wind_direction_10m: number;
    visibility: number;
    time: string;
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weather_code: number[];
    precipitation_probability_max: number[];
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    weather_code: number[];
    precipitation_probability: number[];
  };
}

const Weather: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Toronto coordinates
  const TORONTO_LAT = 43.6532;
  const TORONTO_LON = -79.3832;

  // Helper function to determine day status (past, current, future)
  const getDayStatus = (dateString: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day
    
    const forecastDate = new Date(dateString);
    forecastDate.setHours(0, 0, 0, 0);
    
    if (forecastDate < today) return 'past';
    if (forecastDate.getTime() === today.getTime()) return 'current';
    return 'future';
  };

  // Helper function to get day styling based on status
  const getDayStyling = (status: 'past' | 'current' | 'future') => {
    switch (status) {
      case 'past':
        return {
          opacity: 0.6,
          transition: 'opacity 0.3s ease-in-out',
          '&:hover': {
            opacity: 1,
          },
        };
      case 'current':
        return {
          border: '2px solid',
          borderImage: 'linear-gradient(45deg, #2196F3, #FF9800) 1',
          boxShadow: '0 4px 8px rgba(33, 150, 243, 0.3)',
        };
      case 'future':
        return {
          // Keep current styling
        };
      default:
        return {};
    }
  };

  const getWeatherIcon = (weatherCode: number) => {
    if (weatherCode === 0) return <SunnyIcon />;
    if (weatherCode >= 1 && weatherCode <= 3) return <CloudIcon />;
    if (weatherCode >= 51 && weatherCode <= 67) return <RainIcon />;
    if (weatherCode >= 71 && weatherCode <= 77) return <SnowIcon />;
    if (weatherCode >= 95 && weatherCode <= 99) return <StormIcon />;
    return <CloudIcon />;
  };

  const getWeatherDescription = (weatherCode: number) => {
    if (weatherCode === 0) return 'Clear sky';
    if (weatherCode >= 1 && weatherCode <= 3) return 'Partly cloudy';
    if (weatherCode >= 51 && weatherCode <= 67) return 'Rain';
    if (weatherCode >= 71 && weatherCode <= 77) return 'Snow';
    if (weatherCode >= 95 && weatherCode <= 99) return 'Thunderstorm';
    return 'Cloudy';
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${TORONTO_LAT}&longitude=${TORONTO_LON}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_direction_10m,visibility&hourly=temperature_2m,weather_code,precipitation_probability&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=America/Toronto`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }

        const data = await response.json();
        setWeatherData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        Error loading weather data: {error}
      </Alert>
    );
  }

  if (!weatherData) {
    return (
      <Alert severity="warning" sx={{ mt: 2 }}>
        No weather data available
      </Alert>
    );
  }

  const { current, daily, hourly } = weatherData;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <LocationIcon sx={{ mr: 1 }} />
        Toronto Weather
      </Typography>

      {/* Current Weather */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Current Weather
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
            <Box sx={{ flex: 1 }}>
              <Box display="flex" alignItems="center" mb={2}>
                {getWeatherIcon(current.weather_code)}
                <Box ml={2}>
                  <Typography variant="h3">
                    {Math.round(current.temperature_2m)}°C
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    {getWeatherDescription(current.weather_code)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Feels like {Math.round(current.apparent_temperature)}°C
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box sx={{ flex: 1 }}>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <HumidityIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Humidity" 
                    secondary={`${current.relative_humidity_2m}%`} 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <WindIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Wind Speed" 
                    secondary={`${current.wind_speed_10m} km/h`} 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <VisibilityIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Visibility" 
                    secondary={`${current.visibility / 1000} km`} 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <RainIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Precipitation" 
                    secondary={`${current.precipitation} mm`} 
                  />
                </ListItem>
              </List>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* 7-Day Forecast */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            7-Day Forecast
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(7, 1fr)' }, gap: 2 }}>
            {daily.time.slice(0, 7).map((date, index) => {
              const dayStatus = getDayStatus(date);
              const dayStyling = getDayStyling(dayStatus);
              
              return (
                <Paper 
                  key={date} 
                  elevation={1} 
                  sx={{ 
                    p: 2, 
                    textAlign: 'center',
                    ...dayStyling
                  }}
                >
                  <Typography variant="subtitle2" color="text.secondary">
                    {new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" display="block">
                    {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </Typography>
                  <Box display="flex" justifyContent="center" alignItems="center" my={1}>
                    {getWeatherIcon(daily.weather_code[index])}
                  </Box>
                  <Typography variant="h6">
                    {Math.round(daily.temperature_2m_max[index])}°
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {Math.round(daily.temperature_2m_min[index])}°
                  </Typography>
                  <Chip 
                    label={`${daily.precipitation_probability_max[index]}%`}
                    size="small"
                    color="primary"
                    sx={{ mt: 1 }}
                  />
                </Paper>
              );
            })}
          </Box>
        </CardContent>
      </Card>

      {/* Hourly Forecast */}
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Hourly Forecast (Next 24 Hours)
          </Typography>
          <Box sx={{ overflowX: 'auto' }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(24, 1fr)', gap: 1, minWidth: '1200px' }}>
              {hourly.time.slice(0, 24).map((time, index) => (
                <Paper key={time} elevation={1} sx={{ p: 1, textAlign: 'center' }}>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(time).toLocaleTimeString('en-US', { 
                      hour: 'numeric',
                      hour12: true 
                    })}
                  </Typography>
                  <Box display="flex" justifyContent="center" my={0.5}>
                    {getWeatherIcon(hourly.weather_code[index])}
                  </Box>
                  <Typography variant="body2">
                    {Math.round(hourly.temperature_2m[index])}°
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {hourly.precipitation_probability[index]}%
                  </Typography>
                </Paper>
              ))}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Weather; 