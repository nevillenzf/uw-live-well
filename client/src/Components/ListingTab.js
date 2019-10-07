import React from 'react';
import {connect} from 'react-redux';
import {Button, Spinner} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import ListingModal from './ListingModal';
import HousingDeck from './HousingDeck';
import '../stylesheet.css';

//This is the component that holds all the filter related stuff which includes
//but not limited to Rent, number of roommates, shared room, amenities etc.

class ListingTab extends React.Component {

  constructor(props) {
    super(props);
    this.renderUserListings = this.renderUserListings.bind(this);
    this.state = {
      show : false,
      doneLoading: false,
    };
  }
  handleClick(option) {
    if (option === "add")
    {
      this.setState({show: true});
    }
  }
  renderUserListings(){
    if (this.state.doneLoading)
    {
      return (
        <div>
        <div>
          <Button variant="light" onClick={() =>this.handleClick("add")}>
            <FontAwesomeIcon icon={faPlus} /> Add Listing
          </Button>
        </div>
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

  handleClose = () => {
    this.setState({show: false});
  }

  render()
  {
    return(
      <div className="ListingTab">
        <h5>My Listings</h5>

        {this.renderUserListings()}
        <div>
          <ListingModal show={this.state.show} size="xl" onHide={this.handleClose}/>
        </div>
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
    listings: state.listings,
  }
}

ListingTab = connect(mapStateToProps)(ListingTab);


export default ListingTab;
