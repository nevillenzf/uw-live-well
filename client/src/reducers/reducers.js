import { combineReducers } from 'redux';
import * as actions from '../actions';

const signInStatus = false;
//0 means not signed in, 1 means signed in
function SignInStatus(state = signInStatus, action) {
  //Current Section Action
  if (action.type === actions.SIGN_IN_STATUS)
  {
    //Get new section
    return action.status;
  }
  else return state;
}



const reducers = combineReducers({
  SignInStatus,
})

export default reducers;
