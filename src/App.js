import "./App.css";

import React from "react";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";

import Login from "./Authentication/Login";
import SignUp from "./Authentication/Signup";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import PersistLogin from "./Components/PersistLogin";
import RequireAuth from "./Components/RequireAuth";
import About from "./Pages/About";
import Admin from "./Pages/Admin";
import Articles from "./Pages/Articles";
import Blog from "./Pages/Blog";
import ConfirmUpload from "./Pages/ConfirmUpload";
import Gallery from "./Pages/Gallery";
import Home from "./Pages/Home";
import IndividualPost from "./Pages/IndividualPost.js";
import IRScholarJournal from "./Pages/Journal";
import Undefined from "./Pages/jsx/Undefined";
import Upload from "./Pages/Upload";

function App() {
  let { articleID } = useParams();
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route element={<PersistLogin />}>
            <Route path="/" index element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/about" element={<About />}></Route>
            {/* <Route path="/articles" element={<Articles />}></Route>
          <Route path="/admin" element={<Admin />}></Route> */}
            <Route path="/gallery" element={<Gallery />}></Route>
            {/* <Route path="/blog" element={<Blog />}></Route>
          <Route path="/journal" element={<IRScholarJournal />}></Route> */}
            <Route path="/upload" element={<Upload />}></Route>
            <Route
              path="/gallery/:articleID"
              element={<IndividualPost />}
            ></Route>
            <Route element={<RequireAuth />}>
              <Route path="/upload/confirm" element={<ConfirmUpload />}></Route>
            </Route>
          </Route>
          {/* <Route path="*" element={<Undefined />}></Route> */}
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
