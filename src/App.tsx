import React, { Component } from 'react';
import Auth from './auth/Auth';
import Footer from './site/Footer';
import AdminNavbar from '../src/components/admin/AdminNavbar';
import Navbar from '../src/site/Navbar';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Home from '../src/site/Home';
import SwitchController from '../src/site/SwitchController';

type sessionState = {
  sessionToken: string | null;
  email: string | null | undefined;
  userRole: string;
  profileId: number;
  subscriptionId: number;
  userId: number;
};

export default class BoardApp extends Component<{}, sessionState> {
  constructor(props: sessionState) {
    super(props);
    this.state = {
      sessionToken: "",
      email: "",
      userRole: "false",
      profileId: 0,
      subscriptionId: 0,
      userId: 0,
    };
    this.protectedViews = this.protectedViews.bind(this);
  }

  componentDidUpdate() {
    console.log("Updated");
    console.log(`User is admin: ${localStorage.getItem('userRole')}`);
  }

  updateUserRole = (newUserRole: string) => {
    if (newUserRole !== null) {
      this.setState({ userRole: newUserRole });
      localStorage.setItem('userRole', newUserRole);
    } else {
      this.setState({ userRole: 'false' });
      localStorage.setItem('userRole', 'false');
    }
    console.log('Local Storage: ', localStorage);
    console.log(`Admin?: ${this.state.userRole}`);
  };

  updateSessionToken = (newToken: string) => {
    localStorage.setItem('sessionToken', newToken);
    this.setState({ sessionToken: newToken });
    console.log(`Token: ${newToken}`);
  };

  updateEmail = (newEmail: string) => {
    localStorage.setItem('email', newEmail);
    this.setState({ email: newEmail });
    console.log(`email: ${newEmail}`);
  };

  updateProfileId = (newProfileId: number) => {
    this.setState({ profileId: newProfileId });
    console.log('profileId from App: ', newProfileId);
  }

  updateSubscriptionId = (newSubscriptionId: number) => {
    this.setState({ subscriptionId: newSubscriptionId });
    console.log('subscriptionId from App: ', newSubscriptionId);
  }

  updateUserId = (newUserId: number) => {
    this.setState({ userId: newUserId });
    console.log('userId from app: ', newUserId);
  };

  clearUser = () => {
    localStorage.clear();
    this.setState({ sessionToken: '', userRole: 'false' });
  };

  protectedViews = () => {
    console.log('userRole: ', this.state.userRole);
    return this.state.sessionToken === localStorage.getItem('sessionToken') ? (
      localStorage.getItem('userRole') === 'true' ? (
        <AdminNavbar
          sessionToken={this.state.sessionToken}
          clearUser={this.clearUser}
          email={this.state.email}
        />
      ) : (
        <Navbar
          clearUser={this.clearUser}
          email={this.state.email}
          sessionToken={this.state.sessionToken}
        />
      )
    ) : (
      <Route exact path='/home'>
        <Auth
          updateSessionToken={this.updateSessionToken}
          updateUserRole={this.updateUserRole}
        />
        <Home />
      </Route>
    );
  };
  componentDidMount() {
    console.log('Mounted');
    if (localStorage.getItem('firstName')) {
      this.setState({ email: localStorage.getItem('email') });
    }
    if (localStorage.getItem('sessionToken')) {
      this.setState({ sessionToken: localStorage.getItem('sessionToken') });
    }
  }

  render() {
    const session = localStorage.getItem('sessionToken');
    return (
      <div className='App'>
        <header id='main'>
          <h1 className='Logo'>Board</h1>
        </header>
          <Home />
        <Router>
          {!session ? (
            <Auth updateSessionToken={this.updateSessionToken} updateUserRole={this.updateUserRole} />
          ) : (
            this.protectedViews()
          )}
          {/* <img src='/boardImage.jpg' alt='charcuterie board image'></img> */}
          <SwitchController
            updateSessionToken={this.updateSessionToken}
            updateEmail={this.updateEmail}
            updateUserRole={this.updateUserRole}
            sessionToken={this.state.sessionToken}
            email={this.state.email}
            userRole={this.state.userRole}
            protectedViews={this.protectedViews}
            clearUser={this.clearUser}
            updateProfileId={this.updateProfileId}
            updateSubscriptionId={this.updateSubscriptionId}
            updateUserId={this.updateUserId}
            profileId={this.state.profileId}
            subscriptionId={this.state.subscriptionId}
            userId={this.state.userId}
          />
          {console.log('Bottom of App')}
        </Router>
        <Footer />
      </div>
    );
  }

}



