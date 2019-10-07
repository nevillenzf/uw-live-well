import React from 'react';
import {Card, Button, ListGroup, ListGroupItem} from 'react-bootstrap';
import ListingInfoModal from './ListingInfoModal';
import 'rc-slider/assets/index.css';
import '../stylesheet.css';

class HousingCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      show : false,
    };
  }

  handleClose = () => {
    this.setState({show: false});
  }

  render()
  {
    //Update the list group items
    return(
      <div className="housingCardGroup">

        <div className="housingCard" key={this.props.myKeyTag}>
        <Card style={{ width: '20rem' }}>
          <Card.Img variant="top" src="https://timedotcom.files.wordpress.com/2015/07/360_pie_1125.jpg?w=800&quality=85" />
          <Card.Body>
            <Card.Title>{this.props.listing.title}</Card.Title>
            <Card.Subtitle>{this.props.listing.address}</Card.Subtitle>
            <ListGroup className="list-group-flush">
              <ListGroupItem><span className="cardNames" >Rent:</span>
                              <span className="cardItem">${this.props.listing.rent}</span></ListGroupItem>
              <ListGroupItem><span className="cardNames" >Roommates:</span>
                              <span className="cardItem">{this.props.listing.curr_roommates}</span></ListGroupItem>
              <ListGroupItem><span className="cardNames" >Bedrooms:</span>
                              <span className="cardItem">{this.props.listing.bedrooms}</span></ListGroupItem>
            </ListGroup>
            <Button variant="light" onClick={() => {this.setState({show: true})}}>Check Me Out!</Button>
          </Card.Body>
        </Card>
        </div>
        <div>
          <ListingInfoModal listing={this.props.listing} show={this.state.show} onHide={this.handleClose} size="xl" owner={this.props.owner}/>
        </div>
      </div>
    )
  }

}

export default HousingCard;
