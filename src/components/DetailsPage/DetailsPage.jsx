import React from 'react';
import {useSelector} from 'react-redux';

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