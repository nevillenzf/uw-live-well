import React from 'react';
import MyNavBar from './MyNavBar';
import FilterMenu from './FilterMenu';
import HousingBrowser from './HousingBrowser';
import ProfileTab from './ProfileTab';
import ListingTab from './ListingTab';
import FavoriteTab from './FavoriteTab';

import {connect} from 'react-redux';

import '../stylesheet.css';

//This is the Component that is going to control what is being rendered on the page
class ContentHandler extends React.Component {
  constructor(props) {
    super(props);
    this.selectivelyRender = this.selectivelyRender.bind(this);
  }

  selectivelyRender(){
    if (this.props.currPage === "home")
    {
      return (
        <div>
        <FilterMenu/>
        <HousingBrowser totalListings={10}/>
        </div>
      )
    }
    else if (this.props.currPage === "profile")
    {
      return (
      <div>
        <ProfileTab/>
      </div>)
    }
    else if (this.props.currPage === "listings")
    {
      return (
      <div>
        <ListingTab/>
      </div>)
    }
    else if (this.props.currPage === "favorites")
    {
      return (
      <div>
        <FavoriteTab/>
      </div>)
    }
  }
  render() {
    return (
      <div className="ContentHandler">
        <MyNavBar/>
        <div className="content">
          {this.selectivelyRender()}
        </div>
        <button onClick={()=>{console.log(this.props.userInfo)}}>debug</button>

      </div>)
  }
}

const mapStateToProps = state => {
  return {
    currPage: state.currPage,
    userInfo: state.userInfo,

  }
}

ContentHandler = connect(mapStateToProps)(ContentHandler);

export default ContentHandler;
