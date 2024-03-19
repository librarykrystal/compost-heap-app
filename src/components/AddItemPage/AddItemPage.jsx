import React from 'react';
import {useSelector} from 'react-redux';

// ADD ITEM page will include:
// Form -
    // headline (text field)
    // notes (text field)
    // tag (dropdown)
    // star (boolean clicks on/off)
// Button to submit
// Button to cancel / go back home without submitting


function AddItemPage() {
  const user = useSelector((store) => store.user);
  return (
    <div className="container">
      <h2>Add item page for {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <p>This is where you can add an item.</p>
    </div>
  );
}

export default AddItemPage;