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

// TAGS page is accessed through settings page and will include:
// list of tags with CRUD including choosing color for each (add/edit might be in modals or separate pages?)
// Button to go back to settings page

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
  const tagList = useSelector((store) => store.tag);

  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_TAGS' });
  }, []);

  // Makes each view load scrolled to top
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  // Go to SettingsPage (cancel) without submitting and changes:
  const goSettingsCancel = (event) => {
    event.preventDefault();
    history.push("/settings");
  }

  console.log('TAG LIST:', tagList);

  return (
    <div className="container">
      <h2>Tags page for {user.username}!</h2>
      <p>Your ID is: {user.id}</p>

      {/* List of TAGS for current user */}
      {tagList.length >0 &&
        <div className="tagList">
          {tagList.map(tag => {
            return (
              <div key={tag.id} >
                <div className="homeListItem" >
                  <Typography sx={{ fontWeight: 700, mt:2, color: `${tag.hex}`}}>{tag.id} {tag.label} {tag.hex}</Typography>
                </div>
              </div>
            );
          })}
        </div>
      }
      <br /><br />

      <Button
        variant="contained"
        color="primary"
        size="large"
        // startIcon={<CheckBoxIcon />}
        onClick={goSettingsCancel}>BACK TO SETTINGS
      </Button>

    </div>
  );
}

export default TagsPage;