import React, { useState, useEffect, useLayoutEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom';

// import Modal once created

// Material UI Imports
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import '@fontsource/cabin/400.css';
import '@fontsource/cabin/700.css';
import '@fontsource/libre-baskerville';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import grey from '@mui/material/colors/grey';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

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


function AddProjectPage() {

  const user = useSelector((store) => store.user);

  const dispatch = useDispatch();
  const history = useHistory();

  // State hooks for entry form
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [genre, setGenre] = useState('');
  const [notes, setNotes] = useState('');

  // CONSOLE LOG array of all form selections as they happen:
  console.log('SELECTIONS...', ["title:", title, "type:", type, "genre:", genre, "notes:", notes]);

  // State hook for warning/prompt if no title is entered
  const [titleWarning, setTitleWarning] = useState(false);

  // State hook for showing confirmation modal after submit
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
  }, []);

  // Makes each view load scrolled to top
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  // SUBMIT FORM function
  const submitForm = (e) => {
    e.preventDefault();
    // Check for headline entry, show warning (and do NOT submit) if no headline was entered:
    if (!title) {
      setTitleWarning(true);
      console.log("NO TITLE, NO SUBMIT");
    } else {
      dispatch({ 
        type: 'ADD_PROJECT',
        payload: {title, type, genre, notes}
    });
      setShowModal(true);
    }
  }

  // Go back home without submitting anything:
  const goBack = (event) => {
    event.preventDefault();
    history.push("/projects");
  }

  return (
    <ThemeProvider theme={theme}>

    <div className="container">
      <Typography sx={{ fontSize: 20, fontWeight: 700 }}>ADD NEW PROJECT PAGE</Typography>
      <Typography sx={{ mb:5}}>User: {user.username} / ID: {user.id}</Typography>

      <div className="addItemForm">

      {/* TEXT input for TITLE */}
      <TextField 
        fullWidth
        id="title"
        required
        label="Title"
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


      {/* SUBMIT button */}
      <Button
        type="submit"
          variant="contained"
          color="primary"
          size="large"
          // startIcon={<CheckBoxIcon />}
          onClick={submitForm}>SUBMIT
        </Button>
        <br /><br />

      {/* CANCEL/HOME button */}
      <Button
        variant="contained"
        color="secondary"
        size="large"
        // startIcon={<DisabledByDefaultIcon />}
        onClick={goBack}>CANCEL
      </Button>
      </div>

      {/* MODAL — shows when submit button is clicked */}
      {/* <Modal  show={showModal}/> */}

    </div>
    </ThemeProvider>
  );
}

export default AddProjectPage;