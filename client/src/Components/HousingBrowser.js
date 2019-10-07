import React from 'react';
import HousingDeck from './HousingDeck';
import {Spinner} from 'react-bootstrap';
import PageList from './PageList';
import {connect} from 'react-redux';
import axios from 'axios';
import store from '../index';

import '../stylesheet.css';

//This is the component that holds all the filter related stuff which includes
//but not limited to Rent, number of roommates, shared room, amenities etc.

class HousingBrowser extends React.Component {
  constructor(props) {
    super(props);
    this.selectivelyRender = this.selectivelyRender.bind(this);
  }

  selectivelyRender()
  {
    console.log(this.props)

    if (this.props.doneLoading)
    {
      return (
        <div className="housingBrowser">
          <h5>Good matches for you</h5>
            <br/>
              <HousingDeck listings={this.props.listings}/>
            <br/>
          <div>
          </div>
        </div>
      )
    }
    else
    {
      return (
        <div className="loadingScreen">
          <Spinner animation="border" variant="danger" />
        </div>
      )
    }
  }
  render()
  {
    return(
      <div className="housingBrowserWrapper">
        {this.selectivelyRender()}
      </div>
    )
  }

  componentDidMount()
  {
    //Initial load - always load default page
    let req = {"rent":[400,1000],"roommates":[1,2]}
    axios.post(`http://localhost:5000/listings`, req)
      .then(res => {
        console.log(res.data)
        if (typeof(res.data) !== "string")
        {
          store.dispatch({type: "CURR_LISTINGS",
                          listings: res.data,
                          });
        }
        else
        {
          console.log("There is nothing")
          console.log(res.data);
        }

      })

      setTimeout(()=>{store.dispatch({type: "LOAD_LISTINGS",
                              loadListings: true,
                              });
                      this.forceUpdate()},1000);

  }
}

const mapStateToProps = state => {
  return {
    listings: state.currListings,
    doneLoading: state.loadListings,
  }
}

HousingBrowser = connect(mapStateToProps)(HousingBrowser);

export default HousingBrowser;
