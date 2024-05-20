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
import TextField from '@mui/material/TextField';

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
  const project = useSelector((store) => store.project);
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  // State hooks for edit form
  const [title, setTitle] = useState(project.title);
  const [type, setType] = useState(project.type);
  const [genre, setGenre] = useState(project.genre);
  const [notes, setNotes] = useState(project.notes);

  useEffect(() => {
    dispatch({ type: 'FETCH_PROJECT', payload: id });
  }, []);

  // Second useEffect to get around the FETCH being incomplete upon render, thus not updating initial state
  useEffect(() => {
    setTitle(project.title);
    setType(project.type);
    setGenre(project.genre);
    setNotes(project.notes);
  }, [project]);

  const deleteThisProject = () => {
    dispatch({ 
      type: 'DELETE_PROJECT',
      payload: id
    });
    history.push("/projects");
    // confirmation modal?
  }

  const goProjectsCancel = (event) => {
    event.preventDefault();
    dispatch({ type: 'CLEAR_PROJECT' });
    history.push("/projects");
  }

  return (
    <ThemeProvider theme={theme}>

      <div className="container">
        <h2>Edit project page for {user.username}!</h2>
        <p>This is where you can edit a project. Right now, GET by ID is complete, but editing function is not yet built.</p>
      </div>

      {project &&
        <>
          <Typography>PROJECT ID: {project.id}</Typography>
          <br /><br />
          
          {/* TEXT input for TITLE */}
          <TextField 
            fullWidth
            id="title"
            required
            label="Project Title"
            variant="standard"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <br /><br />

          {/* TEXT input for TYPE */}
          <TextField 
            fullWidth
            id="type"
            label="Type"
            variant="standard"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
          <br /><br />

          {/* TEXT input for GENRE */}
          <TextField 
            fullWidth
            id="genre"
            label="Genre"
            variant="standard"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
          <br /><br />

          {/* TEXT BOX input for NOTES */}
          <TextField
            id="notes"
            label="Notes"
            fullWidth
            multiline
            rows={8}
            variant="outlined"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          <br /><br />
        </>
      }
      
      <br /><br />

      {/* DELETE button */}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        onClick={deleteThisProject}>DELETE THIS PROJECT
      </Button>
      <br /><br />
      
      <Button
        variant="contained"
        color="primary"
        size="large"
        // startIcon={<CheckBoxIcon />}
        onClick={goProjectsCancel}>BACK TO PROJECTS
      </Button>

    </ThemeProvider>
  );
}

export default EditProjectPage;