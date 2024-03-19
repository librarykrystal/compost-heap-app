import React from 'react';
import {useSelector} from 'react-redux';

// DETAILS page will include:
// Full item details-
    // headline
    // notes
    // star status
    // tag
// Button to edit (goes to EditItemPage)
// Button to go bacl home

function ItemPage() {
  const user = useSelector((store) => store.user);
  return (
    <div className="container">
      <h2>Item details page for {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <p>This is where details of a list item will be.</p>
    </div>
  );
}

export default ItemPage;