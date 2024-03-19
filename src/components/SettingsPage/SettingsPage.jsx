import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';

function Settings() {
  const user = useSelector((store) => store.user);
  return (
    <div className="container">
      <h2>Settings Page for {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
    </div>
  );
}

export default Settings;