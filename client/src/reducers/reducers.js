import { combineReducers } from 'redux';
import * as actions from '../actions';

const signInState = false;
const initUserInfo = {name: null,id: null, email: null, pic_url: null, listings:null};
const defPage = "home"
//0 means not signed in, 1 means signed in
function signInStatus(state = signInState, action) {
  //Current Section Action
  if (action.type === actions.SIGN_IN_STATUS)
  {
    //Update sign in status
    return action.status;
  }
  else return state;
}

function userInfo(state = initUserInfo, action) {
  //Current Section Action
  if (action.type === actions.USER_INFO)
  {
    //Store user info in redux state
    return action.data;
  }
  else return state;
}

function currPage(state = defPage, action) {
  //Current Section Action
  if (action.type === actions.CURR_PAGE)
  {
    //Store user info in redux state
    return action.page;
  }
  else return state;
}

const reducers = combineReducers({
  signInStatus,
  userInfo,
  currPage,
})

export default reducers;
