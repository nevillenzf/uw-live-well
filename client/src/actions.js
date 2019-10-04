
//Const name
export const SIGN_IN_STATUS = "SIGN_IN_STATUS";
export const USER_INFO = "USER_INFO";
export const CURR_PAGE = "CURR_PAGE";
export const CURR_LISTINGS = "CURR_LISTINGS";
export const SLIDER_VAL = "SLIDER_VAL";

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
export function currPage(page) {
  return {
    type: CURR_PAGE,
    page: page,
  }
}

export function currListings(listings) {
  return {
    type: CURR_LISTINGS,
    listing: listings,
  }
}

export function sliderVal(name,values) {
  return {
    type: SLIDER_VAL,
    name: name,
    values: values
  }
}
