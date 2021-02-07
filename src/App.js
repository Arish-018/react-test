import React from "react";
import { Route } from "react-router-dom";
import './App.css';
import HomeContainer from "./components/HomeContainer";

function App() {
  return (
    <div className="App">
      <Route path="/" exact component={HomeContainer} />
    </div>
  );
}

export default App;
