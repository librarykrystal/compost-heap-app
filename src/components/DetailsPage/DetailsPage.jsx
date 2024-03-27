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

// DETAILS page will include:
// Full item details-
    // headline
    // notes
    // star status
    // tag
// Button to edit (goes to EditItemPage)
// Button to go back home

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

function ItemPage() {

  const user = useSelector((store) => store.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const tag = useSelector((store) => store.tag);
  const idea = useSelector((store) => store.item);
  const { id } = useParams();

  useEffect(() => {
    dispatch({ type: 'FETCH_IDEA', payload: id });
    dispatch({ type: 'FETCH_TAG', payload: id });
  }, []);

  // Makes each view load scrolled to top
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  console.log("TAG DATA:", tag);

  return (
    <ThemeProvider theme={theme}>
      <div className="container">
        <Typography sx={{ fontSize: 28, fontWeight: 700 }}>Item details page</Typography>
        <Typography sx={{ mb:3 }}>User: {user.username} / ID: {user.id}</Typography>
        {/* below conditional checks for store objects' content before rendering */}
        { Object.keys(idea).length > 0 && Object.keys(tag).length > 0 ?
          <>
            <Typography sx={{ fontSize: 22, fontWeight: 700, mt:3 }} >{idea.headline}</Typography>
            <Typography>{idea.notes}</Typography>
            <Typography sx={{ mt:3, mb:3, color: `${tag.tag_hex}` }}>tag: {tag.tag_label}</Typography>
            {/* TO DO: change above line to another conditional considering NO TAG situations */}
            {/* if there is no tag, maybe put a button to add one */}
            <Typography>star?</Typography>
            {idea.star ?
              <Typography>yes</Typography>
            :
              <Typography>no</Typography>
            }
          </>
          :
          <Typography>NO IDEA. HOW SAD.</Typography>
        }
      </div>
    </ThemeProvider>
  );
}

export default ItemPage;