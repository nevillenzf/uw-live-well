import React from 'react';
import {Navbar, Nav, Button} from 'react-bootstrap';
import LoginModal from './LoginModal';

class MyNavBar extends React.Component {

  constructor(props) {
    super(props);
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
  }
  handleClose = () => {
    this.setState({show: false});
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
          <Button onClick={() =>this.handleClick("poop")}>Sign In!</Button>
        </div>
      </Navbar>
      </div>
      <div>
        <LoginModal show={this.state.show} onHide={this.handleClose}/>
      </div>
    </div>)
  }
}

export default MyNavBar;
