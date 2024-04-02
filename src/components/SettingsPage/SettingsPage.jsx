import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom';

// Material UI Imports
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import '@fontsource/cabin/400.css';
import '@fontsource/cabin/700.css';
import '@fontsource/libre-baskerville';
import grey from '@mui/material/colors/grey';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';

// SETTINGS will include:
// Link to TagsPage
// OPTIONAL FEATURE: dark/light mode options

// Material UI Theming
const theme = createTheme({
  typography: {
    fontFamily: [
      'Libre Baskerville',
    ],
  },
  palette: {
    primary: {
      main: '#d9d9d9',
    },
    secondary: {
      main: grey[700],
      contrastText: "#fff",
    },
    alert: {
      main: grey[700],
      contrastText: "#fff",
    },
  },
});

function Settings() {
  const user = useSelector((store) => store.user);
  const history = useHistory();

  // Go to TagsPage:
  const goTags = (event) => {
    event.preventDefault();
    history.push("/tags");
  }

  const label = { inputProps: { 'aria-label': 'Switch demo' } };

  return (
    <ThemeProvider theme={theme}>
    <div className="container">
      <h2>Settings Page</h2>
      <p>User: {user.username} / ID: {user.id}</p>

      <Stack spacing={2} direction="row" sx={{ mb: 2, mt: 2 }} alignItems="center">
        <Typography>Show tag names on home screen</Typography>
      <Switch color="secondary" {...label} />
      </Stack>

      <Button
        variant="contained"
        color="primary"
        size="large"
        // startIcon={<CheckBoxIcon />}
        onClick={goTags}>MANAGE TAGS
      </Button>

    </div>
    </ThemeProvider>
  );
}

export default Settings;