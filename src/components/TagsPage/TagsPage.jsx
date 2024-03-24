import React from 'react';
import {useSelector} from 'react-redux';

// TAGS page is accessed through settings page and will include:
// list of tags with CRUD including choosing color for each (add/edit might be in modals or separate pages?)
// Button to go back to settings page

function TagsPage() {
  const user = useSelector((store) => store.user);
  return (
    <div className="container">
      <h2>Tags page for {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
    </div>
  );
}

export default TagsPage;