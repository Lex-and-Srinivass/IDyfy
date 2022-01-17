import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/home";
import Navbar from "./components/Navbar/navbar";
import FeedPage from "./components/Feed_Page/feedpage";
import Notification from "./components/Notification/notification";
import Starred_ideas from "./components/Starred_Ideas/starred_ideas";
import Profile from "./components/Profile/Profile";
import MyIdeas from "./components/MyIdeas/myideas";
import Idea from "./components/Idea/idea";
import Feature from "./components/feature/feature";
// import { isMobile } from "react-device-detect";
import Error from "./components/error/error";
import VerifyEmail from "./components/verifyemail/verify";
import Protectedroute from "./components/protectedroutes";
function App() {
  return (
    <div className="App">
      {" "}
      {/* {isMobile ? (
                        <>
                          <h3 className="mt-20 bg-red-200 p-10">
                            🙏🏼🙏🏼 This content is unavailable on mobile 🙏🏼🙏🏼
                          </h3>
                          <h4 className="mt-20 bg-green-200 p-10">😀 😃 Coming Soon 😀 😃</h4>
                        </>
                      ) : ( */}{" "}
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Protectedroute path="/feed" exact component={FeedPage} />
          <Protectedroute path="/notification" exact component={Notification} />
          <Protectedroute path="/starred" exact component={Starred_ideas} />
          <Protectedroute path="/profile" exact component={Profile} />
          <Protectedroute path="/myideas" exact component={MyIdeas} />
          <Protectedroute path="/idea" exact component={Idea} />
          <Protectedroute path="/feature" exact component={Feature} />
          <Route path="/email/verify/:id" exact component={VerifyEmail} />

          <Route path="/" component={Error} />
        </Switch>
        {/* <Footer /> */}
      </BrowserRouter>
      {/* )} */}
    </div>
  );
}

export default App;
