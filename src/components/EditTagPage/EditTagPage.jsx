import React, { useState, useEffect, useLayoutEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom';
import { useParams, Link } from 'react-router-dom';
import { CirclePicker } from 'react-color';

// Material UI Imports
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import '@fontsource/cabin/400.css';
import '@fontsource/cabin/700.css';
import '@fontsource/libre-baskerville';
import grey from '@mui/material/colors/grey';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

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
  // const id = tag.id;

  // State hooks for edit form
  const [label, setLabel] = useState(tag.label);
  const [hex, setHex] = useState(tag.hex);
  // State hook for warning/prompt if no label is entered
  const [labelWarning, setLabelWarning] = useState(false);
  // State hook for showing confirmation modal after submit
  const [showModal, setShowModal] = useState(false);

  // CONSOLE LOG array of all form selections as they happen:
  console.log('SELECTIONS...', ["label:", label, "color:", hex]);

  useEffect(() => {
    dispatch({ type: 'FETCH_TAG', payload: id });
  }, []);

  // Second useEffect to get around the FETCH being incomplete upon render, thus not updating initial state
  useEffect(() => {
    setLabel(tag.label);
    setHex(tag.hex);
  }, [tag]);

  const hexIt = (colorObj) => {
    setHex(colorObj.hex);
  }

  // SUBMIT FORM function
  const submitForm = (e) => {
    e.preventDefault();
    // Check for headline entry, show warning (and do NOT submit) if no headline was entered:
    if (!label) {
      setLabelWarning(true);
      console.log("NO LABEL, NO SUBMIT");
    } else {
      dispatch({ 
        type: 'UPDATE_TAG',
        payload: {id, label, hex}
    });
      setShowModal(true);
    }
  }

  const goTagsCancel = (event) => {
    event.preventDefault();
    dispatch({ type: 'CLEAR_TAG' });
    history.push("/tags");
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="container">
        <h2>Edit tag page for {user.username}!</h2>
        <p>This is where you can edit an item.</p>
      </div>
      { tag &&
        <>
          <Typography>TAG ID: {tag.id}</Typography>

          <div className="addItemForm">

            {/* TEXT input for LABEL */}
            <TextField 
              fullWidth
              id="label"
              required
              label="Tag Name"
              variant="standard"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
            />
            <br /><br />

            {/* COLOR PICKER */}
            <Box sx={{ mb:4 }}>
              {/* <HexColorPicker className="colorPicker" color={color} onChange={(e) => setColor(e)} /> */}
              <CirclePicker className="colorPicker" color={hex} onChange={(e) => hexIt(e)} />
            </Box>

            {/* SUBMIT button */}
            <Button
            type="submit"
              variant="contained"
              color="primary"
              size="large"
              // startIcon={<CheckBoxIcon />}
              onClick={submitForm}>SUBMIT UPDATES
            </Button>
            <br /><br />

          </div>
        </>
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