import React from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import axios from 'axios';
import store from '../index';
import {connect} from 'react-redux';

class ListingModal extends React.Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleSubmit = (event) => {
    event.preventDefault()

    //Handle the form elements
    let title = document.getElementById('formBasicTitle').value;
    let address = document.getElementById('formBasicAddress').value;
    let rent = document.getElementById('formBasicRent').value;
    let bathrooms = document.getElementById('formBasicBathrooms').value;
    let bedrooms = document.getElementById('formBasicBedrooms').value;
    let roommates = document.getElementById('formBasicCurrRoommates').value;

    let genderPref = document.getElementById('formBasicGenderPref').value;
    //Change genderPref to int
    if (genderPref === "Male"){
      genderPref = 0
    }
    else if (genderPref === "Female"){
      genderPref = 1
    }
    else if (genderPref === "Non-Binary"){
      genderPref = 2
    }
    else genderPref = null

    let type = document.getElementById('formBasicType').value;
    //Change type to int
    if (type === "House"){
      type = 0
    }
    else if (type === "Apartment"){
      type = 1
    }

    let userID = this.props.userInfo.id

    let formVals = {title:title,address:address,rent:rent,
                    bathrooms:bathrooms,bedrooms:bedrooms,
                    roommates:roommates,gender_pref:genderPref,
                    type:type, poster_id:userID}
    console.log(formVals)
    //Hide modal when receive something from fb
    axios.post(`http://localhost:5000/addListing`, { formVals })
      .then(res => {
        console.log(res.data);
        //Hide the modal
        this.props.onHide();

      })
  }

  render()
  {
    return(
      <div>
        <Modal show={this.props.show} onHide= {this.props.onHide} size={this.props.size}>
          <Modal.Header closeButton>
            <Modal.Title>Create new Listing</Modal.Title>
          </Modal.Header>

          <Modal.Body>
          <div>
            <Form onSubmit={this.handleSubmit} id="form-thing">

              <Form.Group controlId="formBasicTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Type in something to attract roommates!" />
              </Form.Group>

              <Form.Group controlId="formBasicAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" placeholder="Address" />
              </Form.Group>

              <Form.Group controlId="formBasicRent">
                <Form.Label>Rent</Form.Label>
                <Form.Control type="number" placeholder="Rent $$$" />
              </Form.Group>

              <Form.Group controlId="formBasicBathrooms">
                <Form.Label>Bathrooms Available</Form.Label>
                <Form.Control type="number" placeholder="Number of Bathrooms" />
              </Form.Group>

              <Form.Group controlId="formBasicBedrooms">
                <Form.Label>Bedrooms Available</Form.Label>
                <Form.Control type="number" placeholder="Number of Bedrooms" />
              </Form.Group>

              <Form.Group controlId="formBasicCurrRoommates">
                <Form.Label>Current Roommates</Form.Label>
                <Form.Control type="number" placeholder="Current Number of Roommates" />
              </Form.Group>

              <Form.Group controlId="formBasicType">
                <Form.Label>Type</Form.Label>
                <Form.Control as="select">
                      <option>House</option>
                      <option>Apartment</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formBasicGenderPref">
                <Form.Label>Gender Preference</Form.Label>
                <Form.Control as="select">
                      <option>No Preference</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Non-Binary</option>
                </Form.Control>
              </Form.Group>

              <Button variant="primary" type="submit">
                Add Listing
              </Button>
            </Form>
          </div>

          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.onHide}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    userInfo: state.userInfo,
  }
}

ListingModal = connect(mapStateToProps)(ListingModal);

export default ListingModal;
