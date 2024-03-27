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
  // const heap = useSelector((store) => store.heap);
  const tagList = useSelector((store) => store.tag);
  const idea = useSelector((store) => store.item);
  const { id } = useParams();

  useEffect(() => {
    dispatch({ type: 'FETCH_IDEA', payload: id });
    dispatch({ type: 'FETCH_ALL_TAGS' });
  }, []);

  // Makes each view load scrolled to top
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  // let tag;
  let tagLabel;
  let tagColor;


// THIS RANDOMLY BREAKS (maybe once of every ~10 reloads) when located here (outside of return).
  // When it breaks, console shows:
      // IDEA TEST: {}            empty object
      // IDEA TAG ID: NaN
  // CURRENT FIX: putting this process within the conditional render in a map through tags
      // this makes sure the store is populated before I try to find my tag ID match
  // TO DO: research ways to complete this (async?) here rather than within the return for better code

  // if (tagList.length > 0 && idea.id != 0) {
  //   console.log("IDEA TEST:", idea);
  //   let ideaTagId = +`${idea.tag_id}`;
  //   console.log("IDEA TAG ID:", ideaTagId);
  //   tag = tagList.find(item => item.id == +ideaTagId);
  //   console.log("TAG TEST:", tag.label);
  //   tagLabel = `${tag.label}`;
  //   tagColor = `${tag.hex}`;
  // };


  return (
    <ThemeProvider theme={theme}>
      <div className="container">
        <Typography sx={{ fontSize: 28, fontWeight: 700 }}>Item details page</Typography>
        <Typography sx={{ mb:5 }}>User: {user.username} / ID: {user.id}</Typography>
{/* below conditional checks for content in idea object and length in tagList array to confirm store arrived */}
        { Object.keys(idea).length > 0 && tagList.length > 0 ?
          <>
            {tagList.map(eachTag => {
              let ideaTagId = +`${idea.tag_id}`;
              // console.log("IDEA TAG ID:", ideaTagId, " TAG ID:", eachTag.id);
              if( ideaTagId == eachTag.id ) {
                console.log("MATCH!", ideaTagId);
                tagLabel = `${eachTag.label}`;
                console.log("tagLabel:", tagLabel);
                tagColor = `${eachTag.hex}`;
                console.log("tagColor:", tagColor);
              }
            })}

            <Typography sx={{ mt:2, color: '#808080' }}>ID #{id} HAS ARRIVED</Typography>
            <Typography sx={{ fontSize: 22, fontWeight: 700, mt:4 }} >{idea.headline}</Typography>
            <Typography>{idea.notes}</Typography>
            <Typography sx={{ mt:2, color: `${tagColor}` }}>tag: {tagLabel}</Typography>
            {/* TO DO: change above line to another conditional for NO TAG situations */}
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