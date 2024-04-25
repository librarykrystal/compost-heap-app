import React from 'react';
import {useSelector} from 'react-redux';

// EDIT TAG PAGE is reached through TagsPage and will include:
// Ability to fully edit this tag and submit
// Ability/Button to delete this tag
// Button to return to tags page

function EditTagPage() {
  const user = useSelector((store) => store.user);
  return (
    <div className="container">
      <h2>Edit tag page for {user.username}!</h2>
      <p>This is where you can edit an item.</p>
    </div>
  );
}

export default EditTagPage;