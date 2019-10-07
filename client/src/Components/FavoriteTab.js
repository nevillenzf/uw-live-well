import React from 'react';
import HousingDeck from './HousingDeck';
import {Spinner} from 'react-bootstrap';
import {connect} from 'react-redux';
import '../stylesheet.css';

//This is the component that holds all the filter related stuff which includes
//but not limited to Rent, number of roommates, shared room, amenities etc.

class FavoriteTab extends React.Component {

  constructor(props) {
    super(props);
    this.renderUserListings = this.renderUserListings.bind(this);
    this.state = {
      doneLoading: false,
    };
  }

  renderUserListings(){
    if (this.state.doneLoading)
    {
      return (
        <div>
          <HousingDeck myDeck={"testing"} listings={this.props.userInfo.listings} />
        </div>
      )
    }
    else
    {
      return (
        <div className="loadingScreen">
          <Spinner animation="border" variant="danger" />
        </div>
      )
    }

  }

  render()
  {
    return(
      <div className="FavoriteTab">
      <h5>My Favorites</h5>
        {this.renderUserListings()}
      </div>
    )
  }

  //Things to do after component mounts, asynchronously load listings from redux store
  componentDidMount()
  {
    setTimeout(()=>{this.setState({doneLoading: true});},1000);
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
