import React from 'react';
import MyNavBar from './MyNavBar';
import FilterMenu from './FilterMenu';
import HousingBrowser from './HousingBrowser';
import {connect} from 'react-redux';

import '../stylesheet.css';

//This is the Component that is going to control what is being rendered on the page
class ContentHandler extends React.Component {
  render() {

    return (
      <div className="ContentHandler">
        <MyNavBar/>
        <FilterMenu/>
        <HousingBrowser totalListings={10}/>
      </div>)
  }
}

const mapStateToProps = state => {
  return {
    SignInStatus: state.SignInStatus,
  }
}

ContentHandler = connect(mapStateToProps)(ContentHandler);

export default ContentHandler;
