import React from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';
import store from '../index';
class LoginModal extends React.Component {

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
        //Hide the modal
        this.props.onHide();
        store.dispatch({type: "SIGN_IN_STATUS", status: true})
        store.dispatch({type: "USER_INFO",
                        data: {name: res.data.name,
                        email: res.data.email,
                        pic_url: res.data.pic_url,
                        id: res.data.id},
                        });
      })
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
            <FacebookLogin
              appId="705105513337686"
              autoLoad={false}
              fields="name,email,picture"
              callback={this.responseFacebook} />
          </div>
            or
          <div>
            <h5>Sign in on UW Live Well</h5>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>

              <Button variant="primary" type="submit">
                Sign In
              </Button>
            </Form>
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
