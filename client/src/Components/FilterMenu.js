import React from 'react';
import MySlider from './MySlider';

//This is the component that holds all the filter related stuff which includes
//but not limited to Rent, number of roommates, shared room, amenities etc.

class FilterMenu extends React.Component {

  render()
  {
    return(
      <div className="filterMenu">
        <h5>What are you looking for?</h5>
          <MySlider name={"rent"} min={0} max={3000}
                    defaultValue={[400,1000]}
                    marks={{0 : '$0', 3000 : '$3000'}}
                    useToolTip={true}
                    prefix={"$"}/>
          <br/>
          <MySlider name={"roommates"} min={0} max={5}
                    defaultValue={[1,2]}
                    marks={{0 : '0', 5 : '5+'}}
                    useToolTip={true}
                    />
      </div>
    )
  }
}

export default FilterMenu;
