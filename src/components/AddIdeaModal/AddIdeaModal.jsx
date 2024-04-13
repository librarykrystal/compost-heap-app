import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom';
import './AddIdeaModal.css';

// Material UI Imports
import { createTheme, ThemeProvider } from '@mui/material/styles';
import grey from '@mui/material/colors/grey';
import Typography from '@mui/material/Typography';
import '@fontsource/libre-baskerville';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import FactCheckIcon from '@mui/icons-material/FactCheck';

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

function Modal(props) {

  const history = useHistory();
  const dispatch = useDispatch();
  const idea = useSelector((store) => store.idea);

  // CONDITIONAL RENDER:
  // This modal only shows if triggered by a true prop value from AddPage.jsx
  if(!props.show) {
    return null
  }

  const goHome = (event) => {
    event.preventDefault();
    // Clearing item reducer when user goes back to home list:
    dispatch({ 
      type: 'CLEAR_IDEA'
     });
    history.push("/");
  }

  const goToItem = (event) => {
    event.preventDefault();
    history.push(`/details/${idea.id}`);
  }

  return (
    <ThemeProvider theme={theme}>
      <center>

      {/* CONDITIONAL RENDER:
      Shows success if an item has been sent to reducer through post saga success,
      Shows failture if item reducer is still empty */}

        {/* SUCCESS MESSAGE */}
        { idea.id &&
          <div className="modal">
            <div className="modal-content">
              <div className="modal-header">
                <Typography variant="h5" mt={1} mb={1} gutterBottom >Success!</Typography>
              </div>
              <div className="modal-body">
                <Typography variant="body1" mt={2} mb={2} gutterBottom>The new item has been added to your inventory.</Typography>
              </div>
              <div className="modal-footer">

                {/* VIEW SUBMITTED ITEM button */}
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={<FactCheckIcon />}
                  onClick={goToItem}>VIEW IDEA
                </Button>
                <br/><br/><br/>

                {/* HOME button */}
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={<HomeIcon />}
                  onClick={goHome}>HOME
                </Button>

              </div>
            </div>
          </div>
        }

        {/* FAILURE MESSAGE */}
        { !idea.id &&
          <div className="modal">
            <div className="modal-content">
              <div className="modal-header">
                <Typography variant="h5" mt={1} mb={1} gutterBottom >Oh, no!</Typography>
              </div>
              <div className="modal-body">
                <Typography variant="body1" mt={2} mb={2} gutterBottom>There was an error adding the item. </Typography>
              </div>
              <div className="modal-footer">

                {/* HOME button */}
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={<HomeIcon />}
                  onClick={goHome}>HOME
                </Button>

              </div>
            </div>
          </div>
        }
      </center>
    </ThemeProvider>
  );
}

export default Modal;