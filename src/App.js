import React from 'react';
import './App.css';
import Home from "./pages/Home";
import Rooms from "./pages/Room";
import SingleRoom from "./pages/SingleRoom";
import Error from "./pages/Error";
import { Route, Switch } from "react-router-dom";
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/rooms/" exact component={Rooms}></Route>
        <Route path="/rooms/:slug" exact component={SingleRoom}></Route>
        <Route component={Error} />
      </Switch>
    </div>
  );
}

export default App;
