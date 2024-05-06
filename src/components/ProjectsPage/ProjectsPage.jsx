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
import Card from '@mui/material/Card';
import Switch from '@mui/material/Switch';
import AddBoxIcon from '@mui/icons-material/AddBox';
import EditIcon from '@mui/icons-material/Edit';

// PROJECTS page will include:
// list of user's projects with CRUD (add/edit might be in modals or separate pages?)
    // projects will be accessed elsewhere in app so ideas can be assigned to a project
// Button to go back home

// May have one-time intro message that can be DISMISSED


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

function ProjectsPage() {

  const user = useSelector((store) => store.user);
  const projects = useSelector((store) => store.projects);

  const label = { inputProps: { 'aria-label': 'Switch demo' } };

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_PROJECTS' });
  }, []);

  // Makes each view load scrolled to top
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  const goNewProject = (event) => {
    event.preventDefault();
    history.push("/newproject");
  }

  const goEdit = (projectId) => {
    console.log('goEdit CLICKED, ID:', projectId);
    history.push(`/editproject/${projectId}`);
  }

  // Go to SettingsPage (cancel) without submitting and changes:
  const goSettingsCancel = (event) => {
    event.preventDefault();
    history.push("/settings");
  }

  console.log('PROJECT LIST:', projects);

  return (
    <ThemeProvider theme={theme}>
    <div className="container">
      <Typography sx={{ fontSize: 28, fontWeight: 700 }}>Projects page</Typography>
      <Typography sx={{ mb:3 }}>User: {user.username} / ID: {user.id}</Typography>

      {/* List of PROJECTS for current user */}
      {projects.length >0 &&
        <div className="tagList">
          {projects.map(project => {
            return (
              <div key={project.id} >
                <Card
                  variant="outlined"
                  className="tagListCard"
                  sx={{ m:2, pl:2, pr:3, boxShadow: 1}}
                  onClick={() => goEdit(project.id)}
                >
                  <Stack spacing={1.5} direction="row" sx={{ mb: .5, mt: .5 }} alignItems="center">
                    <Typography sx={{ fontWeight: 700, mt:2}}>{project.title}</Typography>
                  </Stack>
                </Card>
              </div>
            );
          })}
        </div>
      }
      
      <Button
        variant="contained"
        color="primary"
        size="large"
        // startIcon={<CheckBoxIcon />}
        onClick={goNewProject}>ADD NEW PROJECT
      </Button>
      <br />

      <Button
        variant="contained"
        color="primary"
        size="large"
        // startIcon={<CheckBoxIcon />}
        onClick={goSettingsCancel}>BACK TO SETTINGS
      </Button>

    </div>
    </ThemeProvider>
  );
  
}


export default ProjectsPage;