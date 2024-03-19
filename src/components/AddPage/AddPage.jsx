import React from 'react';
import {useSelector} from 'react-redux';

function AddPage() {
  const user = useSelector((store) => store.user);
  return (
    <div className="container">
      <h2>Add item page for {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <p>This is where you can add an item.</p>
    </div>
  );
}

export default AddPage;