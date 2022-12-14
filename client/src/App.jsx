import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { API } from "./Services/api.js";

//importing components
import Navbar from "./Components/Navigation/Navbar";
import Footer from "./Components/Navigation/Footer";
import Home from "./Components/Pages/Home";
import Blog from "./Components/Pages/Blog";
import Post from "./Components/Pages/Post";
import Search from "./Components/Pages/Search";
import UserData from "./Components/Pages/UserData";
import EditUser from "./Components/Pages/EditUser.jsx";
import Player from "./Components/Library/widgets/Player";
import Alert from "./Components/Library/widgets/Alert.jsx";

//context
import ColorContext from "./Context/ColorContext";
import { account } from "./Context/UserContext";

//from mui libraries
import Box from "@mui/material/Box";

const App = () => {
  const { pathname } = useLocation();
  const { user, setUser } = useContext(account);
  const [alert, setAlert] = useState({});
  const [closePlayer, setClosePlayer] = useState(true);
  const [currentBlog, setCurrentBlog] = useState({});

  useEffect(() => {
    sessionStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  // scroll to top when ever new page is loaded
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const handleCredentialResponse = async (response) => {
      const res = await API.signinUserWithGoogle({
        token: response.credential,
      });
      const data = await res.data;
      if (data.success) {
        setUser(data.data);
        localStorage.setItem("token", response.credential);
        sessionStorage.setItem("user", JSON.stringify(data.data));
      }
    };

    const autoLogin = async (token) => {
      if (!token) return;
      try {
        const res = await API.signinUserWithGoogle({ token });
        const data = await res.data;
        if (data.success) {
          setUser(data.data);
          sessionStorage.setItem("user", JSON.stringify(data.data));
          // setAlert({
          //   type: "success",
          //   msg: `Logged in as ${data.data.username}`,
          // });
          return true;
        } else {
          localStorage.setItem("token", "");
          return false;
        }
      } catch (error) {
        localStorage.setItem("token", "");
        return false;
      }
    };

    const promptForLogin = () => {
      /* global google */
      google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
      });
      google.accounts.id.prompt();
    };

    const checkForPreviousToken = async () => {
      const prevToken = localStorage.getItem("token");

      if (prevToken && prevToken !== "") {
        const res = await autoLogin(prevToken);
        if (res) return;
      }

      promptForLogin();
    };

    if (!user.name && !user.email) {
      checkForPreviousToken();
    }
  }, []);

  return (
    <ColorContext>
      <Navbar />
      {alert.type && <Alert alert={alert} />}
      <Player
        close={closePlayer}
        setClose={setClosePlayer}
        currentBlog={currentBlog}
      />
      <Box mt="70px"></Box>
      <Routes>
        <Route exact path="/" element={<Home showAlert={setAlert} />} />
        <Route
          exact
          path="/user/:id"
          element={<UserData showAlert={setAlert} />}
        />
        <Route
          exact
          path="/user/edit/:id"
          element={<EditUser showAlert={setAlert} />}
        />
        <Route exact path="/blog" element={<Blog showAlert={setAlert} />} />
        <Route
          exact
          path="/blog/search"
          element={<Search showAlert={setAlert} />}
        />
        <Route
          exact
          path="/blog/:title"
          element={
            <Post
              setClosePlayer={setClosePlayer}
              isPlayerClosed={closePlayer}
              setCurrentBlog={setCurrentBlog}
              showAlert={setAlert}
            />
          }
        />
      </Routes>
      <Footer />
    </ColorContext>
  );
};

export default App;
