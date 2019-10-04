import React from 'react';
import {connect} from 'react-redux';
import '../stylesheet.css';

//This is the component that holds all the filter related stuff which includes
//but not limited to Rent, number of roommates, shared room, amenities etc.

class FavoriteTab extends React.Component {

  render()
  {
    return(
      <div className="FavoriteTab">
      <h5>My Favorites</h5>
        There doesn't seem to be anything here at the moment...
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    signInStatus: state.signInStatus,
    userInfo: state.userInfo,
  }
}

FavoriteTab = connect(mapStateToProps)(FavoriteTab);


export default FavoriteTab;
