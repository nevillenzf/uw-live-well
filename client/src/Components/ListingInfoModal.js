import React from 'react';
import {Button, Modal, Image, Row} from 'react-bootstrap';
import {connect} from 'react-redux';
import '../stylesheet.css';

//This is the component that holds all the filter related stuff which includes
//but not limited to Rent, number of roommates, shared room, amenities etc.

class ListingInfoModal extends React.Component {

  //Passed in the name of the listing
  //Header is going to hold the Title, Address, Rent
  renderImage(url){
    //If there is a url use url else just use default img which is the pie
    if (url)
      return url
    else
    {
      return "https://timedotcom.files.wordpress.com/2015/07/360_pie_1125.jpg?w=800&quality=85"
    }
  }
  renderListingInfo(){
    console.log(this.props.owner)
    return (
      <div className="listingInfoModal">

        <Modal show={this.props.show} onHide= {this.props.onHide} size={this.props.size}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.listing.address}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Row className="listingHeader">
              <div className="listing-left">
                <div><h5>{this.props.listing.title}</h5></div>
                <Image className="listing-pic" src={this.renderImage(this.props.listing.pic_url)} rounded />
              </div>
              <div className="listing-info">
                <div>Rent: ${this.props.listing.rent}</div>
                <div>Posted by: {this.props.owner==="mine"?this.props.userInfo.name:this.props.listing.user_name}</div>

              </div>
            </Row>
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
