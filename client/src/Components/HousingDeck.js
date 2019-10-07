import React from 'react';
import {CardDeck} from 'react-bootstrap';
import HousingCard from './HousingCard';
import '../stylesheet.css';
import {TransitionGroup, CSSTransition} from 'react-transition-group';

//This is the component that holds all the filter related stuff which includes
//but not limited to Rent, number of roommates, shared room, amenities etc.

class HousingDeck extends React.Component {

  render()
  {
    if (this.props.listings !== undefined && this.props.listings !== null && this.props.listings.length > 0)
    {
      console.log(this.props)
      return(
          <div>
          <CardDeck>
            {this.props.listings.map((listings, listingIndex) => {
                return (
                  <CSSTransition  key={listingIndex}
                                  in={true}
                                  timeout={500}
                                  classNames="item"
                                  appear={true}>
                    <HousingCard
                    key={listingIndex}
                    listing={listings}
                    myDeck={this.props.myDeck}
                   />
                 </CSSTransition>
              )
            })}
          </CardDeck>
          </div>
      )
    }
    else
    {
      return(
          <div>
            Doesn't seem to be anything here...
          </div>
      )
    }

  }
}

export default HousingDeck;
