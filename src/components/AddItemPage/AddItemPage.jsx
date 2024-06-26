import React, { useState, useEffect, useLayoutEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom';
// import { HexColorPicker } from "react-colorful";

import Modal from '../AddIdeaModal/AddIdeaModal';

// Material UI Imports
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import '@fontsource/cabin/400.css';
import '@fontsource/cabin/700.css';
import '@fontsource/libre-baskerville';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import grey from '@mui/material/colors/grey';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// ADD ITEM page will include:
// Form -
    // headline (text field)
    // notes (text field)
    // tag (dropdown)
    // star (boolean clicks on/off)
// Button to submit
// Button to cancel / go back home without submitting

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


function AddItemPage() {

  const user = useSelector((store) => store.user);
  const tagList = useSelector((store) => store.tags);
  const projects = useSelector((store) => store.projects);

  const dispatch = useDispatch();
  const history = useHistory();

  // State hooks for entry form
  const [headline, setHeadline] = useState('');
  const [notes, setNotes] = useState('');
  const [tag, setTag] = useState(0);
  const [project, setProject] = useState(0);
  const [star, setStar] = useState(false);

  // CONSOLE LOG array of all form selections as they happen:
  console.log('SELECTIONS...', ["headline:", headline, "notes:", notes, "tag:", tag, "project:", project, "star:", star]);

  // State hook for warning/prompt if no headline is entered
  const [headlineWarning, setHeadlineWarning] = useState(false);

  // State hook for showing confirmation modal after submit
  const [showModal, setShowModal] = useState(false);

  console.log('PROJECTS:', projects);

  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_TAGS' });
    dispatch({ type: 'FETCH_ALL_PROJECTS' });
  }, []);

  // Makes each view load scrolled to top
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  // Toggle for star status:
  const handleStar = () => {
    setStar(!star);
  };

  // SUBMIT FORM function
  // TO DO: test out sending NULL values to columns with ref keys
  const submitForm = (e) => {
    e.preventDefault();
    // Check for headline entry, show warning (and do NOT submit) if no headline was entered:
    if (!headline) {
      setHeadlineWarning(true);
      console.log("NO HEADLINE, NO SUBMIT");
    } else if (tag == 0 && project != 0) {
      // Dispatch data WITHOUT tag (which defaults to NULL in database)
      dispatch({ 
        type: 'ADD_IDEA',
        payload: {headline, notes, project, star}
    });
      setShowModal(true);
    } else if (project == 0 && tag != 0) {
      // Dispatch data WITHOUT project (which defaults to NULL in database)
      dispatch({ 
        type: 'ADD_IDEA',
        payload: {headline, notes, tag, star}
    });
      setShowModal(true);
    } else if (tag == 0 && project == 0) {
      // Dispatch data WITHOUT tag or project (both of which default to NULL in database)
      dispatch({ 
        type: 'ADD_IDEA',
        payload: {headline, notes, star}
    });
      setShowModal(true);
    } else {
      dispatch({ 
        type: 'ADD_IDEA',
        payload: {headline, notes, tag, project, star}
    });
      setShowModal(true);
    }
  }

  // Go back home without submitting anything:
  const goBack = (event) => {
    event.preventDefault();
    // dispatch({ 
    //   type: 'CLEAR_ITEM'
    //  });
    history.push("/");
  }

  return (
    <ThemeProvider theme={theme}>
      {tagList.length > 0 && projects.length > 0 &&
    <div className="container">
      <Typography sx={{ fontSize: 20, fontWeight: 700 }}>ADD NEW ITEM PAGE</Typography>
      <Typography sx={{ mb:5}}>User: {user.username} / ID: {user.id}</Typography>

      <div className="addItemForm">

      {/* TEXT input for HEADLINE */}
      <TextField 
        fullWidth
        id="headline"
        required
        label="Headline"
        variant="standard"
        // defaultValue={0}
        value={headline}
        onChange={(e) => setHeadline(e.target.value)}
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

      {/* DROPDOWN input for TAG */}
      <FormControl fullWidth>
        <InputLabel id="tag">Tag</InputLabel>
          <Select
            required
            labelId="tag"
            id="tag"
            // value={tagList.length ? {tag} : 0}
            value={tag}
            label="Tag"
            onChange={(e) => setTag(e.target.value)}
          >
            <MenuItem value={0}>
              <Typography display="inline" >None</Typography>
            </MenuItem>
          {/* mapping through user's collection of tags from database: */}
          {tagList.map(tag => {
            return (
                <MenuItem
                  key={tag.id}
                  value={tag.id}>
                  <Typography display="inline" sx={{ mr:1, color: `${tag.hex}`}}>◼︎</Typography>
                  <Typography display="inline" >{tag.label}</Typography>
                </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <br /><br />

      {/* DROPDOWN input for PROJECT */}
      <FormControl fullWidth>
        <InputLabel id="project">Project</InputLabel>
          <Select
            required
            labelId="project"
            id="project"
            value={project}
            label="Project"
            onChange={(e) => setProject(e.target.value)}
          >
            <MenuItem value={0}>
              <Typography display="inline" >None</Typography>
            </MenuItem>
          {/* mapping through user's collection of projects from database: */}
          {projects.map(project => {
            return (
                <MenuItem
                  key={project.id}
                  value={project.id}>
                  <Typography display="inline" >{project.title}</Typography>
                </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <br /><br />

      {/* FAVORITE selection conditional & toggle */}
      <div className="starToggleContainer">
        <span className="newStar">
          { star == true ?
            <IconButton aria-label="unstar" onClick={handleStar}>
              <StarIcon fontSize="large"/>
            </IconButton>
          :
          <IconButton aria-label="toxic" onClick={handleStar}>
            <StarOutlineIcon fontSize="large"/>
          </IconButton>
          }
        </span>
      </div>
      <br />

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
      <Modal  show={showModal}/>

    </div>
}
    </ThemeProvider>
  );
}

export default AddItemPage;