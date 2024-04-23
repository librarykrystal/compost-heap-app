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
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import AddBoxIcon from '@mui/icons-material/AddBox';
import EditIcon from '@mui/icons-material/Edit';

// TAGS page is accessed through settings page and will include:
// list of tags with CRUD including choosing color for each (add/edit might be in modals or separate pages?)
// Button to go back to settings page

// Will have one-time intro message that can be DISMISSED
// explaining intro set of tags are provided but that user can freely CRUD and choose colors
// tap a tag to edit or delete it

// ACCESSIBILITY IDEA: make option for user to decide how tags are displayed on listings —
      // color dot default, or full text option for color blind or low-vis folks
      // can be boolean in database with conditional render on list/detail pages

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

function TagsPage() {

  const user = useSelector((store) => store.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const tagList = useSelector((store) => store.tags);
  const label = { inputProps: { 'aria-label': 'Switch demo' } };

  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_TAGS' });
  }, []);

  // Makes each view load scrolled to top
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  // Route to details of clicked item
  const goEdit = (tagId) => {
    console.log('goEdit CLICKED, ID:', tagId);
    // history.push(`/tag/${tagId}`);
  }

  const goNew = () => {
    console.log('goNew CLICKED');
  }

  const goNewTag = (event) => {
    event.preventDefault();
    history.push("/newtag");
  }

  const goSettingsCancel = (event) => {
    event.preventDefault();
    history.push("/settings");
  }

  console.log('TAG LIST:', tagList);

  return (
    <ThemeProvider theme={theme}>
    <div className="container">
      <h2>Tags page</h2>
      <p>User: {user.username} / ID: {user.id}</p>

      {/* List of TAGS for current user */}
      {tagList.length >0 &&
        <div className="tagList">
          {tagList.map(tag => {
            return (
              <div key={tag.id} >
                <Card
                  variant="outlined"
                  className="tagListCard"
                  sx={{ m:2, pl:2, pr:3, boxShadow: 1}}
                  onClick={() => goEdit(tag.id)}
                >
                  <Stack spacing={1.5} direction="row" sx={{ mb: .5, mt: .5 }} alignItems="center">
                    <Typography display="inline" sx={{ fontSize: 24, color: `${tag.hex}`}}>◼︎</Typography>
                    <Typography sx={{ fontWeight: 700, mt:2}}>{tag.label}</Typography>
                  </Stack>
                </Card>
              </div>
            );
          })}
        </div>
      }
      <AddBoxIcon sx={{ fontSize: 42 }} color="secondary" className="editIcon" />
      <br /><br />

      <Button
        variant="contained"
        color="primary"
        size="large"
        // startIcon={<CheckBoxIcon />}
        onClick={goNewTag}>ADD NEW TAG
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


export default TagsPage;