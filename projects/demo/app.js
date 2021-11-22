import React, { useState } from "react";
import GlobalContext from "./constants/GlobalContext";
import { HashRouter } from "react-router-dom";
import SubTitle from "./components/SubTitle";
import './App.css';

const App = () => {
  const [title, setTitle] = useState('WELCOME KUBE-REACT!')
  function handleInput(e) {
    setTitle(e.target.value);
  }
  return (
    <GlobalContext.Provider value={{ title }}>
      <HashRouter basename='/'>
        <div className="App">
          <header className="App-header">
            <SubTitle />
            <p>Input some words</p>
            <input onChange={handleInput}></input>
          </header>
        </div>
      </HashRouter>
    </GlobalContext.Provider>
  );
}

export default App;
