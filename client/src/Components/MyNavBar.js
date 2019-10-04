import React from 'react';
import {Navbar, Nav, Button, Dropdown, DropdownButton,Row} from 'react-bootstrap';
import LoginModal from './LoginModal';
import {connect} from 'react-redux';
import store from '../index';

class MyNavBar extends React.Component {

  constructor(props) {
    super(props);
    this.renderUserInfo = this.renderUserInfo.bind(this);
    this.state = {
      show : false,
    };

  }
  handleClick(status) {
    //FIXME: IN FUTURE VERSIONS - MAKE SURE REFER TO REDUX STORAGE
    if (status === "poop")
    {
      //Render Modal
      this.setState({show: true});
    }
    if (status === "logout")
    {
      //Should push stuff to the database to save it
      store.dispatch({type: "SIGN_IN_STATUS", status: false})
      store.dispatch({type: "USER_INFO",
                      data: {name: null,
                      email: null,
                      pic_url: null,
                      id: null},
                      });
    }
  }
  handleClose = () => {
    this.setState({show: false});
  }

  renderUserInfo() {
    console.log()
    if (this.props.signInStatus === false)
    {
        return (
          <div>
            <Button onClick={() =>this.handleClick("poop")}>Sign In!</Button>
          </div>
        )
    }
    else return (
      <Row>
        <div>
          <span>Welcome back,{this.props.userInfo.name}!</span>
        </div>

        <div>
        <DropdownButton id="dropdown-basic-button" title="My Profile">
          <Dropdown.Item href="#/action-1">View Profile</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Favorites</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={() => this.handleClick("logout")}>Logout</Dropdown.Item>
        </DropdownButton>
        </div>
      </Row>)
  }

  render() {
    return (
      <div>
      <div id="my-nav-bar" >
      <Navbar bg="dark" variant="dark" fixed="top">
        <Navbar.Brand href="#home">UW Live Well!</Navbar.Brand>
        <Nav className="mr-auto">

        </Nav>
        <div id="outline-info">
          {this.renderUserInfo()}
        </div>
      </Navbar>
      </div>
      <div>
        <LoginModal show={this.state.show} onHide={this.handleClose}/>
      </div>
    </div>)
  }
}

const mapStateToProps = state => {
  return {
    signInStatus: state.signInStatus,
    userInfo: state.userInfo,
  }
}

MyNavBar = connect(mapStateToProps)(MyNavBar);

export default MyNavBar;
