import React from 'react';
import {CardDeck} from 'react-bootstrap';
import HousingCard from './HousingCard';
import '../stylesheet.css';

//This is the component that holds all the filter related stuff which includes
//but not limited to Rent, number of roommates, shared room, amenities etc.

class HousingDeck extends React.Component {

  render()
  {
    return(
        <div>
        <CardDeck>
          {this.props.listings.map((listings, listingIndex) => {
              return (<HousingCard
              key={listingIndex}
              listings={listings}
               />
            )
          })}
        </CardDeck>
        </div>
    )
  }
}

export default HousingDeck;
