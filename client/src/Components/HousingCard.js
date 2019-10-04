import React from 'react';
import {Card, Button, ListGroup, ListGroupItem} from 'react-bootstrap';

import 'rc-slider/assets/index.css';

class HousingCard extends React.Component {


  render()
  {
    //Update the list group items
    return(
      <div className="housingCard">
      <Card style={{ width: '20rem' }}>
        <Card.Img variant="top" src="https://timedotcom.files.wordpress.com/2015/07/360_pie_1125.jpg?w=800&quality=85" />
        <Card.Body>
          <Card.Title>{this.props.listings.title}</Card.Title>
          <Card.Subtitle>{this.props.listings.address}</Card.Subtitle>
          <ListGroup className="list-group-flush">
            <ListGroupItem>{this.props.listings.rent}</ListGroupItem>
            <ListGroupItem>Roommates: {this.props.listings.roommates}</ListGroupItem>
            <ListGroupItem>Bedrooms: {this.props.listings.bedrooms}</ListGroupItem>
          </ListGroup>
          <Button variant="primary">Check Me Out!</Button>
        </Card.Body>
      </Card>
      </div>
    )
  }
}

export default HousingCard;
