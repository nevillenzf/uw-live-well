import React from 'react';
import {CardDeck} from 'react-bootstrap';
import HousingCard from './HousingCard';
import PageList from './PageList';
import '../stylesheet.css';

//This is the component that holds all the filter related stuff which includes
//but not limited to Rent, number of roommates, shared room, amenities etc.

class HousingBrowser extends React.Component {

  constructor (props) {
        super (props);
        //In the future it'll probs be listings.title, listing.address, listings.id,
        //All information will be passed in through listings which is probably stored
        //in the Redux store
        this.state = {
            listings: ['listing1', 'listing2', 'listing3', 'listing4','listing5'],
            addresses: ['123 bum st', 'test addr', 'random addr', '456 covfefe ave','test run'],

        }
    }

  render()
  {
    return(
      <div className="housingBrowser">
        <h5>Good matches for you</h5>
        <br/>
        <div>
        <CardDeck>
          {this.state.listings.map((listings, listingIndex) => {
              return (<HousingCard
              key={listingIndex}
              title={listings}
              address={this.state.addresses[listingIndex]}
               />
            )
          })}
        </CardDeck>
        </div>

        <br/>

        <div>
          <PageList totalListings={this.state.listings.length}/>
        </div>
      </div>
    )
  }
}

export default HousingBrowser;
