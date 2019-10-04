import React from 'react';
import {Button, Modal} from 'react-bootstrap';
import {connect} from 'react-redux';
import '../stylesheet.css';

//This is the component that holds all the filter related stuff which includes
//but not limited to Rent, number of roommates, shared room, amenities etc.

class ListingInfoModal extends React.Component {

  //Passed in the name of the listing
  //Header is going to hold the Title, Address, Rent
  renderListingInfo(){
    return (
      <div className="listingInfoModal">

        <Modal show={this.props.show} onHide= {this.props.onHide} size={this.props.size}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.listing.address}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div className="listingHeader">
              <div>title: {this.props.listing.title}</div>
              <div>Rent: ${this.props.listing.rent}</div>
              <div>Posted by: {this.props.listing.poster_id}</div>
              
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="success" onClick={this.props.onHide}>
              Add To Favorites
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }

  render()
  {
    return(
      <div className="ListingInfoModal">
      {this.renderListingInfo()}
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

ListingInfoModal = connect(mapStateToProps)(ListingInfoModal);


export default ListingInfoModal;
