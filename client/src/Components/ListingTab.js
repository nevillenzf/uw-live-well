import React from 'react';
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap';
import ListingModal from './ListingModal';
import '../stylesheet.css';

//This is the component that holds all the filter related stuff which includes
//but not limited to Rent, number of roommates, shared room, amenities etc.

class ListingTab extends React.Component {

  constructor(props) {
    super(props);
    this.renderUserListings = this.renderUserListings.bind(this);
    this.state = {
      show : false,
    };
  }
  handleClick(option) {
    if (option === "add")
    {
      this.setState({show: true});
    }
  }
  renderUserListings(){
    return (
      <div>
        empty shit
      </div>
    )
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
          <Button onClick={() =>this.handleClick("add")}>Add Listing</Button>
        </div>
        <div>
          <ListingModal show={this.state.show} size="xl" onHide={this.handleClose}/>
        </div>
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

ListingTab = connect(mapStateToProps)(ListingTab);


export default ListingTab;
