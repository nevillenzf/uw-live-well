import React from 'react';
import {CardDeck} from 'react-bootstrap';
import HousingCard from './HousingCard';
import '../stylesheet.css';

//This is the component that holds all the filter related stuff which includes
//but not limited to Rent, number of roommates, shared room, amenities etc.

class HousingDeck extends React.Component {

  render()
  {
    if (this.props.listings !== undefined && this.props.listings !== null && this.props.listings.length > 0)
    {
      return(
          <div>
          <CardDeck>
            {this.props.listings.map((listings, listingIndex) => {
                return (<HousingCard
                key={listingIndex}
                listing={listings}
                 />
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
