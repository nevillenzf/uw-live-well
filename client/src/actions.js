
//Const name
export const SIGN_IN_STATUS = "SIGN_IN_STATUS";
export const USER_INFO = "USER_INFO";

//Action creators
export function signInStatus(status) {
  return {
    type: SIGN_IN_STATUS,
    status: status,
  }
}
export function userInfo(data) {
  return {
    type: USER_INFO,
    data: data,
  }
}
