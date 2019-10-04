import React from 'react';
import {Modal, Button, Form, ButtonToolbar} from 'react-bootstrap';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';
import store from '../index';
class LoginModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isRegistering : false,
    };
  }

  handleSubmit = (event) => {
    event.preventDefault()

    //Handle the form elements
    let email = document.getElementById('loginEmail').value;
    let password = document.getElementById('loginPassword').value;


    let user_info = {email:email,password:password}

    //Hide modal when receive something from fb
    axios.post(`http://localhost:5000/login`, { user_info })
      .then(res => {
        //This means it's successfully logged in
        if (res.data.id)
        {
          console.log(res.data);
          //Hide the modal
          this.props.onHide();
          store.dispatch({type: "SIGN_IN_STATUS", status: true})
          store.dispatch({type: "USER_INFO",
                          data: {name: res.data.name,
                          email: res.data.email,
                          pic_url: res.data.pic_url,
                          id: res.data.id,
                          listings: res.data.listings}
                          });
        }
        else
        {
          //Alert ???
          console.log(res.data);
        }
      })
  }

  handleRegisterSubmit = (event) => {
    event.preventDefault()

    //Handle the form elements
    let email = document.getElementById('registerEmail').value;
    let confirmPassword = document.getElementById('registerConfirmPassword').value;
    let password = document.getElementById('registerPassword').value;
    let name = document.getElementById('registerName').value;
    //Check if passwords match
    if (password !== confirmPassword)
    {
      console.log("Passwords do not match")
    }
    else
    {
      let user_info = {email:email,password:password,name:name}
      console.log(user_info)

      //Hide modal when receive something from fb
      axios.post(`http://localhost:5000/register`, { user_info })
        .then(res => {
          //This means it's successfully logged in
          if (res.data.id)
          {
            console.log(res.data);
            //Hide the modal
            this.props.onHide();
            store.dispatch({type: "SIGN_IN_STATUS", status: true})
            store.dispatch({type: "USER_INFO",
                            data: {name: res.data.name,
                            email: res.data.email,
                            pic_url: res.data.pic_url,
                            id: res.data.id,
                            listings: res.data.listings}
                            });
          }
          else
          {
            //Alert ???
            console.log(res.data);
          }
        })
    }

  }


  responseFacebook = (response) => {
    //response is the shit that we got from Facebook

    //Set up for logging in
    let user_info = {
                      name:response.name,
                      email:response.email,
                      fbAccessToken:response.accessToken,
                      fbID: response.userID,
                      pic_url: response.picture.data.url,
                      }

    //Hide modal when receive something from fb
    //this.props.onHide();
    axios.post(`http://localhost:5000/fblogin`, { user_info })
      .then(res => {
        console.log(res.data);
        if (res.data.id)
        {
          //Hide the modal
          this.props.onHide();
          store.dispatch({type: "SIGN_IN_STATUS", status: true})
          store.dispatch({type: "USER_INFO",
                          data: {name: res.data.name,
                          email: res.data.email,
                          pic_url: res.data.pic_url,
                          id: res.data.id,
                          listings: res.data.listings},
                          });
        }
        else
        {
          //Alert? There might be a problem
        }
      })
  }
  selectivelyRender()
  {
    if (this.state.isRegistering)
    {
      return(
        <div>
        <h5>Register a New Account</h5>
        <Form onSubmit={this.handleRegisterSubmit}>
          <Form.Group controlId="registerEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="registerName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter name" />
          </Form.Group>

          <Form.Group controlId="registerPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>

          <Form.Group controlId="registerConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Confirm Password" />
          </Form.Group>
          <ButtonToolbar>
            <Button variant="primary" type="submit">
              Register
            </Button>
            <Button variant="secondary" onClick={()=>{this.setState({isRegistering:false})}}>
              I Have an account!
            </Button>
          </ButtonToolbar>
        </Form>
        </div>)
    }
    else
    {
      return(
        <div>
        <div>
          <FacebookLogin
            appId="705105513337686"
            autoLoad={false}
            fields="name,email,picture"
            callback={this.responseFacebook} />
        </div>
          <hr/>
        <div>
          <h5>Sign in on UW Live Well</h5>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="loginEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="loginPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <ButtonToolbar>
              <Button variant="primary" type="submit">
                Sign In
              </Button>
              <Button variant="success" onClick={()=>{this.setState({isRegistering:true})}}>
                Register
              </Button>
            </ButtonToolbar>
          </Form>
        </div>
        <hr/>

        </div>
      )
    }
  }

  render()
  {
    return(
      <div>
        <Modal show={this.props.show} onHide= {this.props.onHide}>
          <Modal.Header closeButton>
            <Modal.Title>Sign in or Sign up</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div>
            {this.selectivelyRender()}
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="primary" onClick={this.props.onHide}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

export default LoginModal;
