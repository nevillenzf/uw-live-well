import React from 'react';
import ContentHandler from './ContentHandler';
import '../stylesheet.css';

class WebsiteWrapper extends React.Component {
  render() {

    return (
      <div className="WebsiteWrapper">
      <script src="https://kit.fontawesome.com/620e0a4f1e.js"></script>
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossOrigin="anonymous"
      />
        <ContentHandler/>
      </div>)
  }
}

export default WebsiteWrapper;
