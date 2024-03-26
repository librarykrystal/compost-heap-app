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
  const heap = useSelector((store) => store.heap);
  const tagList = useSelector((store) => store.tag);
  const item = useSelector((store) => store.item);
  // const { id } = useParams();

  useEffect(() => {
    // dispatch({ type: 'FETCH_USER_HEAP' });
    // dispatch({ type: 'FETCH_ITEM', payload: id });
    dispatch({ type: 'FETCH_ALL_TAGS' });
  }, []);

  // Makes each view load scrolled to top
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className="container">
        <h2>Item details page</h2>
        <Typography sx={{ mb:5 }}>User: {user.username} / ID: {user.id}</Typography>
        { item ? 
          <Typography>ITEM #{item.id} HAS ARRIVED</Typography>
          :
          <Typography>NO ITEM. HOW SAD.</Typography>
        }
      </div>
    </ThemeProvider>
  );
}

export default ItemPage;