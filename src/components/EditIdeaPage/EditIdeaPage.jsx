import React from 'react';
import {useSelector} from 'react-redux';

// EDIT ITEM PAGE is reached through DetailsPage and will include:
// Ability to fully edit this item
    // headline (text field)
    // notes (text field)
    // tag (dropdown)
    // star (boolean, clicks on/off)
// Ability to delete item
// Button to return to item page
// Button to return to home

function EditIdeaPage() {
  const user = useSelector((store) => store.user);
  return (
    <div className="container">
      <h2>Edit item page for {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <p>This is where you can edit an item.</p>
    </div>
  );
}

export default EditIdeaPage;