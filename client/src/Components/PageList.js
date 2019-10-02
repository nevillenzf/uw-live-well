import React from 'react';
import {Pagination} from 'react-bootstrap';

import 'rc-slider/assets/index.css';

class PageList extends React.Component {
  numPages = 0;
  MAX_CARDS_IN_PAGE = 12;

  componentWillUpdate()
  {
    this.numPages = Math.ceil(this.props.totalListings/ this.MAX_CARDS_IN_PAGE);
  }

  render()
  {
    console.log(Math.ceil(this.props.totalListings/ this.MAX_CARDS_IN_PAGE));

    return(
      <div className="PageList">
      <Pagination >
        <Pagination.First />
        <Pagination.Prev />
        <Pagination.Item>{1}</Pagination.Item>
        <Pagination.Ellipsis />
        <Pagination.Next />
        <Pagination.Last />
      </Pagination>
      <div>
      </div>
      </div>
    )
  }
}

export default PageList;
