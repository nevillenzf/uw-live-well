import React from 'react';
import {Image, Form, Col, Row, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import '../stylesheet.css';

//This is the component that holds all the filter related stuff which includes
//but not limited to Rent, number of roommates, shared room, amenities etc.

class ProfileTab extends React.Component {

  render()
  {
    return(
      <div className="ProfileTab">
        <h5>My Profile</h5>
        <br/>
          <Image src={this.props.userInfo.pic_url} roundedCircle />
        <div>
        <Form noValidate onSubmit={()=>{console.log("do shit")}}>
          <Form.Group as={Row} controlId="formPlaintextEmail">
            <Form.Label column sm="5">
              Email
            </Form.Label>
            <Col sm="6">
              <Form.Control defaultValue={this.props.userInfo.email} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formCustomName">
            <Form.Label column sm="5">
              Name
            </Form.Label>
            <Col sm="6">
              <Form.Control defaultValue={this.props.userInfo.name} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formPlaintextOldPassword">
            <Form.Label column sm="5">
              Old Password
            </Form.Label>
            <Col sm="6">
              <Form.Control type="password" placeholder="Old Password" />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formPlaintextNewPassword">
            <Form.Label column sm="5">
              New Password
            </Form.Label>
            <Col sm="6">
              <Form.Control type="password" placeholder="New Password" />
            </Col>
          </Form.Group>

          <Button type="submit" variant="light" >Confirm Changes</Button>
        </Form>
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

ProfileTab = connect(mapStateToProps)(ProfileTab);


export default ProfileTab;
