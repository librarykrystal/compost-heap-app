import React, { useState, useEffect, useLayoutEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom';
import { useParams, Link } from 'react-router-dom';

// Material UI Imports
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import '@fontsource/cabin/400.css';
import '@fontsource/cabin/700.css';
import '@fontsource/libre-baskerville';
import grey from '@mui/material/colors/grey';
import Button from '@mui/material/Button';

// EDIT TAG PAGE is reached through TagsPage and will include:
// Ability to fully edit this tag and submit
// Ability/Button to delete this tag
// Button to return to tags page

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

function EditTagPage() {

  const user = useSelector((store) => store.user);
  const tag = useSelector((store) => store.tag);
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    dispatch({ type: 'FETCH_TAG', payload: id });
  }, []);

  const goTagsCancel = (event) => {
    event.preventDefault();
    history.push("/tags");
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="container">
        <h2>Edit tag page for {user.username}!</h2>
        <p>This is where you can edit an item.</p>
      </div>
      { tag &&
        <Typography>TAG ID: {tag.id}</Typography>
      }

      <Button
        variant="contained"
        color="primary"
        size="large"
        // startIcon={<CheckBoxIcon />}
        onClick={goTagsCancel}>BACK TO TAGS
      </Button>
    </ThemeProvider>
  );
}

export default EditTagPage;