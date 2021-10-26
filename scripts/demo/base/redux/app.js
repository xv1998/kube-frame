import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducers from "./reducers";
import SubTitle from "./components/SubTitle";
import { update_title_Action } from "./actions";
import './App.css';

const App = () => {
  const store = createStore(rootReducers);

  const handleInput = (e) =>{
    store.dispatch(update_title_Action(e.target.value));
  }
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <SubTitle />
          <p>Input some words</p>
          <input onChange={handleInput}></input>
        </header>
      </div>
    </Provider>
  );
};

export default App;