import React, { useState, useEffect, useLayoutEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom';
// import Modal from '../AddModal/AddModal';
// import { HexColorPicker } from "react-colorful";

// Material UI Imports
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import '@fontsource/cabin/400.css';
import '@fontsource/cabin/700.css';
import '@fontsource/libre-baskerville';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import grey from '@mui/material/colors/grey';
import Button from '@mui/material/Button';

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
  return (
    <ThemeProvider theme={theme}>
    <div className="container">
      <h2>Add item page for {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <p>This is where you can add an item.</p>
    </div>
    </ThemeProvider>
  );
}

export default AddItemPage;