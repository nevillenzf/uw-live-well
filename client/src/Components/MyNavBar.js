import React from 'react';
import {Navbar, Nav, Button, Dropdown, DropdownButton,Row, Image} from 'react-bootstrap';
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
    else if (status === "home")
    {
      //Should push stuff to the database to save it
      store.dispatch({type: "CURR_PAGE", page: status})
    }
    else if (status === "profile")
    {
      //Should push stuff to the database to save it
      store.dispatch({type: "CURR_PAGE", page: status})
    }
    else if (status === "listings")
    {
      //Should push stuff to the database to save it
      store.dispatch({type: "CURR_PAGE", page: status})
    }
    else if (status === "favorites")
    {
      //Should push stuff to the database to save it
      store.dispatch({type: "CURR_PAGE", page: status})
    }
    else if (status === "logout")
    {
      //Should push stuff to the database to save it
      store.dispatch({type: "SIGN_IN_STATUS", status: false});
      store.dispatch({type: "USER_INFO",
                      data: {name: null,
                      email: null,
                      pic_url: null,
                      id: null},
                      });
      store.dispatch({type: "CURR_PAGE", page: "home"});
    }
  }
  handleClose = () => {
    this.setState({show: false});
  }

  renderUserInfo() {
    if (this.props.signInStatus === false)
    {
        return (
          <div>
            <Button onClick={() =>this.handleClick("poop")}>Sign In!</Button>
          </div>
        )
    }
    else return (
      <Row >
        <div className="wcBackMsg">
          <span>Welcome back,{this.props.userInfo.name}!</span>
          <Image src={this.props.userInfo.pic_url} roundedCircle />
        </div>

        <div>
        <DropdownButton alignRight id="dropdown-menu-align-right" title="My Profile">
          <Dropdown.Item onClick={() => this.handleClick("profile")}>View Profile</Dropdown.Item>
          <Dropdown.Item onClick={() => this.handleClick("listings")}>My Listings</Dropdown.Item>
          <Dropdown.Item onClick={() => this.handleClick("favorites")}>Favorites</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={() => this.handleClick("logout")}>Logout</Dropdown.Item>
        </DropdownButton>
        </div>
      </Row>)
  }

  render() {
    return (
      <div className="nav-bar-wrapper">
      <Navbar id="my-nav-bar" variant="dark" fixed="top">
        <Navbar.Brand><Button onClick={() =>this.handleClick("home")}>UW Live Well!</Button></Navbar.Brand>
        <Nav className="mr-auto">

        </Nav>
        <div id="outline-info">
          {this.renderUserInfo()}
        </div>
      </Navbar>

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
