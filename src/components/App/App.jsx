import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import AddItemPage from '../AddItemPage/AddItemPage';
import DetailsPage from '../DetailsPage/DetailsPage';
import EditItemPage from '../EditItemPage/EditItemPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import SettingsPage from '../SettingsPage/SettingsPage';
import TagsPage from '../TagsPage/TagsPage';
import UserHome from '../UserHome/UserHome';

import './App.css';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Nav />
        <Switch>

          <Redirect exact from="/" to="/home" />

          <Route exact path="/about">
            <AboutPage />
          </Route>

          <ProtectedRoute exact path="/user">
            <UserHome />
          </ProtectedRoute>

          <ProtectedRoute exact path="/add">
            <AddItemPage />
          </ProtectedRoute>

          <ProtectedRoute exact path="/details">
            <DetailsPage />
          </ProtectedRoute>

          <ProtectedRoute exact path="/edit">
            <EditItemPage />
          </ProtectedRoute>

          <ProtectedRoute exact path="/info">
            <InfoPage />
          </ProtectedRoute>

          <ProtectedRoute exact path="/settings">
            <SettingsPage />
          </ProtectedRoute>

          <ProtectedRoute exact path="/tags">
            <TagsPage />
          </ProtectedRoute>

          <Route exact path="/login">
            {user.id ?
              <Redirect to="/user" />
              :
              <LoginPage />
            }
          </Route>

          <Route exact path="/registration">
            {user.id ?
              <Redirect to="/user" />
              :
              <RegisterPage />
            }
          </Route>

          <Route exact path="/home">
            {user.id ?
              <Redirect to="/user" />
              :
              <LandingPage />
            }
          </Route>

          {/* If no routes matched, show 404 */}
          <Route>
            <h1>404</h1>
          </Route>

        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
