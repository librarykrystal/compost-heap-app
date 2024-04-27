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

// EDIT PROJECT PAGE is reached through ProjectsPage and will include:
// Ability to fully edit this project and submit
// Ability/Button to delete this project
// Button to return to projects page

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

function EditProjectPage() {

  const user = useSelector((store) => store.user);
  // const project = useSelector((store) => store.project);
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    dispatch({ type: 'FETCH_PROJECT', payload: id });
  }, []);

  const goTagsCancel = (event) => {
    event.preventDefault();
    history.push("/projects");
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="container">
        <h2>Edit project page for {user.username}!</h2>
        <p>This is where you can edit a project.</p>
      </div>
      {/* { project &&
        <Typography>PROJECT ID: {project.id}</Typography>
      } */}

      <Button
        variant="contained"
        color="primary"
        size="large"
        // startIcon={<CheckBoxIcon />}
        onClick={goTagsCancel}>BACK TO PROJECTS
      </Button>
    </ThemeProvider>
  );
}

export default EditProjectPage;