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
import WarningIcon from '@mui/icons-material/Warning';

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
  const tagList = useSelector((store) => store.tags);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER_HEAP' });
    dispatch({ type: 'FETCH_ALL_TAGS' });
  }, []);

  // Makes each view load scrolled to top
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  // Route to details of clicked item
  const goToDetails = (itemId, tagId) => {
    console.log('goToDetails CLICKED, IDs:', itemId, tagId);
    // dispatch({
    //     type: 'SET_ITEM_ID',
    //     payload: itemId
    //   });
    history.push(`/details/${itemId}`);
  }

  console.log('HEAP:', heap);
  console.log('TAG LIST:', tagList);


  return (
    <ThemeProvider theme={theme}>
    <div className="container">
      <h3>User: {user.username} / ID: {user.id}</h3>

{/* SHOW TAGS for CONVENIENT TESTING/REFERENCE */}
      {/* {tagList.length >0 &&
        <div className="heap">
          {tagList.map(tag => {
            return (
              <div key={tag.id} >
                <div className="homeListItem" >
                  <Typography sx={{ fontWeight: 700, mt:2, color: `${tag.hex}`}}>{tag.label} {tag.hex}</Typography>
                </div>
              </div>
            );
          })}
        </div>
      } */}

{/* HEAP LIST */}
      {(heap.length >0 && tagList.length >0) &&
        <div className="heap">
          {heap.map(idea => {
            let tagId = +`${idea.tag_id}`;
            // console.log("TAG ID IN .MAP", tagId);
            let tag = tagList.find(item => item.id == +tagId);
            let color;
            {tag == null || tag == 0 ? color = '#808080' : color = `${tag.hex}`};
            // console.log("COLOR:", color);
            return (
              <div key={idea.id}>
                <div className="homeListItem" onClick={() => goToDetails(idea.id, tag.id)} >
                  <Typography sx={{ fontSize: 20, fontWeight: 700, mt:2, color: `${color}` }} >{idea.headline}</Typography>
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
