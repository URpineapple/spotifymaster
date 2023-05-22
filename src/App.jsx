import React, { Component } from "react";
import "./App.css";
import "./styles/tablet.css";
import queryString from "query-string";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import PlaylistPage from "./components/Playlist/PlaylistPage";
import MyPage from "./components/Profile/MyPage";
import EditingPlaylist from "./components/Editing";

const LoginPage = () => (
  <div className="login">
    <div className="login-btn">
      <div className="login-btn-text">PlaylistPro</div>
      <button
        onClick={() => {
          window.location = window.location.href.includes("localhost")
            ? "http://localhost:8888/login"
            : "https://playlistpro-backend.vercel.app/login";
        }}
      >
        Sign In
      </button>
    </div>
  </div>
);

class App extends Component {
  state = {
    query: "",
    artists: null,
    accessToken: "",
  };

  setToken = (userToken) => {
    sessionStorage.setItem("token", JSON.stringify(userToken));
  };

  getToken = () => {
    const tokenString = sessionStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    const parsed = queryString.parse(window.location.search);
    const accessToken = userToken ? userToken : parsed.access_token;
    if (!accessToken) return;
    this.setToken(accessToken);
    this.setState({ accessToken });
  };

  componentDidMount() {
    this.getToken();
  }

  render() {
    const { accessToken } = this.state;
    return (
      <div>
        {accessToken ? (
          <div className="App dark" id="App">
            <Router>
              <Navbar />
              <Switch>
                <Route
                  exact
                  path="/"
                  render={() => <MyPage accessToken={accessToken} />}
                />
                <Route
                  path="/playlist/:playlistId"
                  render={(props) => (
                    <div className="pt50">
                      <PlaylistPage
                        {...props}
                        accessToken={accessToken}
                        showEditing={true}
                      />
                    </div>
                  )}
                />
                <Route
                  path="/editing/:playlistId"
                  render={(props) => (
                    <EditingPlaylist {...props} accessToken={accessToken} />
                  )}
                />
              </Switch>
            </Router>
          </div>
        ) : (
          <LoginPage />
        )}
      </div>
    );
  }
}

export default App;
