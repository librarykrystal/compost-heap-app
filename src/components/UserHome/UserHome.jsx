import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom';

// USER HOME will include:
// Main view of entire compost heap
    // List of all item headlines, with color coding and star status
        // OPTIONAL: possibly a single-line snippet of notes or full text?
    // filterable by tag
    // items are clickable (link to DetailsPage)

function UserHome() {

  const user = useSelector((store) => store.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const heap = useSelector((store) => store.heap);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER_HEAP' });
  }, []);

  // Makes each view load scrolled to top
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  console.log('HEAP:', heap);


  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <p>This is your HEAP!</p>

      {heap.length >0 &&
      <div className="heap">
                {heap.map(idea => {
                    return (
                        <div key={idea.id} >
                            <div>
                              <h4>{idea.headline}</h4>
                              <p>{idea.notes}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
}

    </div>
  );
}

export default UserHome;
