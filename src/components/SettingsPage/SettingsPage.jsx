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

// SETTINGS will include:
// Link to TagsPage
// OPTIONAL FEATURE: dark/light mode options

function Settings() {
  const user = useSelector((store) => store.user);
  const history = useHistory();

  // Go to TagsPage:
  const goTags = (event) => {
    event.preventDefault();
    history.push("/tags");
  }

  return (
    <div className="container">
      <h2>Settings Page for {user.username}!</h2>
      <p>Your ID is: {user.id}</p>

      <Button
        variant="contained"
        color="primary"
        size="large"
        // startIcon={<CheckBoxIcon />}
        onClick={goTags}>MANAGE TAGS
      </Button>

    </div>
  );
}

export default Settings;