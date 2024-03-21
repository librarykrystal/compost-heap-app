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

// USER HOME will include:
// Main view of entire compost heap
    // List of all item headlines, with color coding and star status
        // OPTIONAL: possibly a single-line snippet of notes or full text?
    // filterable by tag
    // items are clickable (link to DetailsPage)

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

function UserHome() {

  const user = useSelector((store) => store.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const heap = useSelector((store) => store.heap);
  const tagList = useSelector((store) => store.tag);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER_HEAP' });
    dispatch({ type: 'FETCH_ALL_TAGS' });
  }, []);

  // Makes each view load scrolled to top
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  console.log('HEAP:', heap);
  console.log('TAG LIST:', tagList);

  return (
    <ThemeProvider theme={theme}>
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <p>This is your HEAP!</p>

{/* SHOW TAGS for TESTING*/}
      {tagList.length >0 &&
        <div className="heap">
          {tagList.map(tag => {
            return (
              <div key={tag.id} >
                <div className="homeListItem" >
                  <Typography sx={{ fontSize: 20, fontWeight: 700, mt:2, color: `${tag.hex}`}}>{tag.label}</Typography>
                </div>
              </div>
            );
          })}
        </div>
      }

{/* HEAP LIST */}
      {heap.length >0 &&
        <div className="heap">
          {heap.map(idea => {
            return (
              <div key={idea.id} >
                <div className="homeListItem" >
                  <Typography sx={{ fontSize: 20, fontWeight: 700, mt:2}}>{idea.headline}</Typography>
                  <Typography>{idea.notes}</Typography>
                </div>
              </div>
            );
          })}
        </div>
      }

    </div>
    </ThemeProvider>
  );
}

export default UserHome;
