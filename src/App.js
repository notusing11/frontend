import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Footer from "./component/Footer";
import Header from "./component/Header";
import Infomation from "./component/Information";
import Main from "./component/Main";
import Search from "./component/Search";
import "./css/reset.css";
import "./App.css";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <div className="App">
          <div className="App-space" />
          <div className="App-body">
            <Route path="/" component={Header} />
            <Route path="/" exact component={Main} />
            <Route path="/infomation" exact component={Infomation} />
            <Route path="/search/:word" component={Search} />
          </div>
          <div className="App-space" />
        </div>
        <Route path="/" component={Footer} />
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
