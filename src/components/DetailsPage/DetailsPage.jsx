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
import StarIcon from '@mui/icons-material/Star';
import Stack from '@mui/material/Stack';

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
  const idea = useSelector((store) => store.idea);
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
  // console.log("PROJECT DATA:", project);

  const goEdit = (e) => {
    e.preventDefault();
    console.log("goEdit was clicked.");
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="container">
        <Typography sx={{ fontSize: 28, fontWeight: 700 }}>Item details page</Typography>
        <Typography sx={{ mb:3 }}>User: {user.username} / ID: {user.id}</Typography>
        {/* below conditional checks for store idea content before rendering */}
        { Object.keys(idea).length > 0 ?
          <>
            <Typography sx={{ fontSize: 22, fontWeight: 700, mt:3 }} >{idea.headline}</Typography>
            
            {Object.keys(tag).length > 0 ?
            <Stack direction="row" sx={{ mt: 2 }} alignItems="center">
              <Typography sx={{ mr:1, color: `${tag.tag_hex}`}}>◼︎</Typography>
              <Typography>{tag.tag_label}</Typography>
              <Typography sx={{ ml:1, color: `${tag.tag_hex}`}}>◼︎</Typography>
            </Stack>
            :
            <>
            <Typography>NO TAG. HOW SAD.</Typography>
            {/* OPTIONAL IDEA: if there is no tag, show a button to add one */}
            </>
            }
            
            {idea.star &&
              <StarIcon />
            }

            <div className="notes">
              <Typography mt={2} mb={4}>{idea.notes}</Typography>
            </div>

            <Button
              variant="contained"
              color="secondary"
              size="large"
              // startIcon={<DisabledByDefaultIcon />}
              onClick={goEdit}>EDIT
            </Button>


          </>
          :
          <Typography>NO IDEA. HOW SAD.</Typography>
        }
      </div>
    </ThemeProvider>
  );
}

export default ItemPage;