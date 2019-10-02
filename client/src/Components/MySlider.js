import React from 'react';
import Slider from 'rc-slider';

import 'rc-slider/assets/index.css';

class MySlider extends React.Component {

  Range = Slider.createSliderWithTooltip(Slider.Range);

  handleOnRelease = (values) => {
    console.log(values);
    //In the future push the values to the redux state so that the page can be
    //Rerendered with the correct information -> try to connect with remote server to pull more information
  }

  render()
  {
    return(
      <div>
        <h6>{this.props.name}</h6>
        <this.Range  min={this.props.min} max={this.props.max}
                defaultValue={this.props.defaultValue}
                marks= {this.props.marks}
                onAfterChange={(value) => this.handleOnRelease(value)}
                tipFormatter={value => `${this.props.prefix?this.props.prefix:""}
                ${value}
                ${this.props.suffix?this.props.suffix:""}`}/>
      </div>
    )
  }
}

export default MySlider;
