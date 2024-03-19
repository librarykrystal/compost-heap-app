import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';

// USER HOME will include:
// Main view of entire compost heap
    // List of all item headlines, with color coding and star status
        // OPTIONAL: possibly a single-line snippet of notes
    // filterable by tag
    // items are clickable (link to DetailsPage)

function UserHome() {
  const user = useSelector((store) => store.user);
  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <p>This is where the HEAP list will be.</p>
      {/* <LogOutButton className="btn" /> */}
    </div>
  );
}

export default UserHome;
