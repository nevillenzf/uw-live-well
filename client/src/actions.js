
//Const name
export const SIGN_IN_STATUS = "SIGN_IN_STATUS";
export const SHOW_MODAL = "SHOW_MODAL";

//Action creators
export function signInStatus(status) {
  return {
    type: SIGN_IN_STATUS,
    status: status,
  }
}
