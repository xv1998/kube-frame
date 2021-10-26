import { UPDATE_TITLE } from '@%system_name%/constants/ActionTypes';
import { combineReducers } from "redux";

const initialState = {
  title: ''
};

const basicReducer = (state = initialState, actions) => {
  switch(actions.type){
    case UPDATE_TITLE: {
      return {...state, title: actions.value}
    }
    default:
      return state;
  }
}

const RootReducers = combineReducers({
  basic: basicReducer
})

export default RootReducers;